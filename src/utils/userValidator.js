const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must have at least 6 characters"),

  phone: z.object({
    area_code: z.string().min(2),
    number: z.string().min(8)
  }),

  business: z.object({
    name: z.string(),
    document: z.string()
  }),

  address: z.object({
    street: z.string(),
    house_number: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    zip_code: z.string(),
    city: z.string(),
    state: z.string()
  })
});

module.exports = {
  createUserSchema
};