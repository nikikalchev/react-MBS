const router = require('express').Router();
const User = require('../model/User');
const ObjectID = require('mongodb').ObjectID;
const Joi = require('@hapi/joi');
const { registerValidation } = require('./validation');

const updateValidation = data => {
    const userSchema = Joi.object({
        _id: Joi.string(),
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        role: Joi.string()
    });
    return userSchema.validate(data);
}

router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const u = await User.findOne({ _id: new ObjectID(req.params.id) });
        res.json(u);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.put('/update/:id', async (req, res) => {
    const old = await User.findOne({ _id: new ObjectID(req.params.id) });
    if (!old) {
        sendErrorResponse(req, res, 404, `User with ID=${req.params.id} does not exist`);
        return;
    }
    const user = req.body;
    if (old._id.toString() !== user._id) {
        sendErrorResponse(req, res, 400, `User ID=${user._id} does not match URL ID=${req.params.id}`);
        return;
    }
    const { error } = updateValidation(req.body);
    if (error) return res.status(400).send({ "error": error.details[0].message });
    //Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (old.email != user.email && emailExist) return resp.status(400).send({ "error": "Email already exists" });

    const r = await User.updateOne({ _id: new ObjectID(req.params.id) }, { $set: user });
    res.json(user);
})

router.delete('/delete/:id', async (req, res) => {
    const params = req.params;
    const userToDelete = User.findOne({ _id: new ObjectID(req.params.id) });
    if (!userToDelete) {
        sendErrorResponse(req, res, 404, `User with ID=${req.params.id} does not exist`);
        return;
    }
    await User.deleteOne({ _id: new ObjectID(req.params.id) });
    res.send('User deleted!');      
});

router.post('/create', async (req, resp) => {
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

function sendErrorResponse(req, res, status, message, err) {
    if (req.get('env') === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    })
}

module.exports = router;