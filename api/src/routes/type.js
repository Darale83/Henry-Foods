const { Router } = require("express");
const { Type } = require("../db");
const { createTypes } = require("../utils/functions");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const types = await Type.findAll();
    res.status(200).json(types);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
