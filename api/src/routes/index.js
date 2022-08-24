const { Router } = require("express");
const recipesRouter = require("./recipes.js");
const typesRouter = require("./type.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipesRouter);
router.use("/types", typesRouter);

module.exports = router;
