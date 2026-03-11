const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/AppError');

const PORT = 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "trusted-scripts.com", "'unsafe-eval'"], // Adicionado aqui
      "object-src": ["'none'"],
    }
}))

app.get("/", (req,res) => {
    res.send("Running");
});

app.get('/teste', (req, res, next) => {
  return next(new AppError(`Rota ${req.originalUrl} não encontrada`, 404));
});

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}, access it at http://localhost:${PORT}`);
});