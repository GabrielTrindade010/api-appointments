const AppError = require('../utils/AppError');
const logger = require('../utils/logger');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const jwt = require('jsonwebtoken');

const handleJWTError = () =>
  new AppError('Token inválido. Faça login novamente.', 401);

const handleJWTExpired = () =>
  new AppError('Token expirado. Faça login novamente.', 401);

const handleSequelizeValidation = err => {
  const message = err.errors.map(e => e.message).join(', ');
  return new AppError(message, 400);
}

const handleSequelizeUnique = err => {
  const field = err.errors[0].path;
  return new AppError(`O campo ${field} já está em uso`, 400);
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err
  });
}

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  logger.error(err);

  res.status(500).json({
    status: 'error',
    message: 'Erro interno no servidor'
  });
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err }
  error.message = err.message;

  if (err.name === 'JsonWebTokenError') {
    error = handleJWTError();
  }

  if (err.name === 'TokenExpiredError') {
    error = handleJWTExpired();
  }

  if (err instanceof ValidationError) {
    error = handleSequelizeValidation(err);
  }

  if (err instanceof UniqueConstraintError) {
    error = handleSequelizeUnique(err);
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
}

module.exports = errorHandler;