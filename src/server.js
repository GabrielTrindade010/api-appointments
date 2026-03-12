const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { db } = require("./models");

const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/AppError');

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(cors());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "trusted-scripts.com", "'unsafe-eval'"],
      "object-src": ["'none'"]
    }
  })
);

app.get("/", (req, res) => {
  res.send("Running");
});

app.get('/teste', (req, res, next) => {
  return next(new AppError(`Rota ${req.originalUrl} não encontrada`, 404));
});

app.use(errorHandler);

// INICIAR BANCO + SERVER
db.authenticate()
  .then(() => {
    console.log("Database connected");

    return db.sync({ alter: true }); 
  })
  .then(() => {
    console.log("Tables synchronized");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database error:", err);
  });