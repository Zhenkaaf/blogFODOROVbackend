const router = require('express').Router();
const UserSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');

//REGISTER
router.post('/register', async (req, res) => {
    console.log('we are in register');
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 7);
        const newUser = new UserSchema({ //создает новый объект пользователя с использованием конструктора модели UserSchema
            userName: req.body.username,
            userEmail: req.body.email,
            userPassword: hashedPassword,
        });
        const user = await newUser.save(); //сохраняет нового пользователя в базу данных MongoDB с использованием метода .save() модели newUser
        res.status(200).json(user); //отправляет ответ клиенту в формате JSON с HTTP-статусом 200 (успешный ответ) и включает в тело ответа информацию о сохраненном пользователе.
    } catch (err) {
        res.status(500).json(err); //отправляет HTTP-ответ с кодом  500 и в теле ответа передает объект ошибки err в формате JSON. Код 500 обычно используется для обозначения внутренней серверной ошибки
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    console.log('we are in login');
    console.log('name', req.body.useremail);
    console.log('password', req.body.password);
    try {
        const user = await UserSchema.findOne({ userEmail: req.body.useremail });
        if (!user) {
            return res.status(400).json('Wrong credentials');
        }
        const validated = await bcrypt.compare(req.body.password, user.userPassword);
        if (!validated) {
            return res.status(400).json('Wrong credentials');
        }
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put('/profile', async (req, res) => {
    console.log('we are in update');
    console.log('urll', req.body.userphotoURL);
    try {
        const user = await UserSchema.findByIdAndUpdate(req.body._id, { userPhoto: req.body.userphotoURL }, { new: true });
        console.log('user***', user);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router; //позволяет импортировать router и его обработчики маршрутов в другом модуле (например, в server.js), чтобы его можно было использовать как middleware.
//Экспортирование router также означает, что любые обработчики маршрутов, добавленные к router, будут доступны для использования в других модулях, которые импортируют router




