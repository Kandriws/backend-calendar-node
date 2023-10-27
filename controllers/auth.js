const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists',
            });
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            msg: 'Register',
            uid: user.id,
            name: user.name,
            email,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error to create user',
        });
    }
}

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User does not exists',
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is not valid',
            });
        }

        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            msg: 'User logged',
            uid: user.id,
            name: user.name,
            email,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error to login user',
        });
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generateJWT(uid, name);

    res.status(201).json({
        ok: true,
        msg: 'Token renewed',
        uid,
        name,
        token
    });
}
module.exports = {
    createUser,
    loginUser,
    renewToken
}
//MERN_USER
//NyUCfn0nnm6yLRON