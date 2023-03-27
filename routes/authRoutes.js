const router = require('express').Router();
const UserSchema = require('../models/userSchema.js');
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

module.exports = router;