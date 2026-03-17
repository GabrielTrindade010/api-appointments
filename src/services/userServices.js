const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const { Users, Phone, Address, Business } = require("../models/");
const { createUserSchema } = require("../utils/userValidator");
const UserRepository = require("../repository/UserRepository");

class UserService {

    async createUser(data) {

        const validatedData = createUserSchema.parse(data);

        const { name, email, password, phone, business, address } = validatedData;

        const emailExists = await Users.findOne({
            where: { email }
        });

        if(emailExists) {
            throw new Error("Email already registred");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const transaction = await sequelize.transaction();

        try {

            const newUser = await Users.create({
                name,
                email,
                password: hashedPassword
            }, { transaction });

            const newPhone = await Phone.create({
                area_code: phone.area_code,
                number: phone.number,
            }, { transaction });

            await newUser.addPhone(newPhone, { transaction });

            const newBusiness = await Business.create({
                name: business.name,
                document: business.document
            }, { transaction });

            await newUser.addBusiness(newBusiness, { transaction });

            const newAddress = await Address.create({
                street: address.street,
                house_number: address.house_number,
                complement: address.complement,
                neighborhood: address.neighborhood,
                zip_code: address.zip_code,
                city: address.city,
                state: address.state
            }, { transaction });

            await newUser.addAddress(newAddress, { transaction });

            await transaction.commit();

            return newUser;

        } catch (error) {

            await transaction.rollback();
            throw error;

        }

    }

    async getUser(data) {
        return UserRepository.findById(data.id);
    }

}

module.exports = new UserService();