const router = require('express').Router();
const User = require('../model/User');
const jwt = require("jsonwebtoken");
const { loginValidation, registerValidation } = require('./validation');

var bcrypt = require("bcryptjs");

router.post('/register', async (req, resp) => {
    const { error } = registerValidation(req.body);
    if (error) return resp.status(400).send({ "error": error.details[0].message });
    //Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return resp.status(400).send({ "error": "Email already exists" });
    //compose new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    try {
        //save the user in the database
        const savedUser = await user.save();
        resp.send(savedUser);
    } catch (err) {
        resp.status(400).send(err)
    }

});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ "error": error.details[0].message });

    //Checking if the user is already in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ "error": "Email is not found" });
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ "error": "Invalid password" });
    res.send(user);  
})

router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

function sendErrorResponse(req, res, status, message, err) {
    if(req.get('env') === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    })
}

module.exports = router;