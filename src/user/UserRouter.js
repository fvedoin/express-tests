const express = require("express");
const bcrypt = require("bcrypt");
const { create } = require("./UserService");

const router = express.Router();

router.post("/users", async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    await create({ ...req.body, password: hash });
    res.send({ message: "User created" });
});

module.exports = router;