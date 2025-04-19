const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function signup(req, res) {
    try {
        const { username, email, firstName, lastName } = req.body;

        const newUser = await userModel.create({
            username,
            email,
            password: req.body.password,
            firstName,
            lastName,
        });

        res.status(201).json({ newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET);
        res.status(200).json({ token, status: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { signup, login };
