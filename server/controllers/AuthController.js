const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation');


const register = async (req, res) => {
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).json({ message: 'email already exists' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        notes: []
    })

    try {
        const savedUser = await user.save()
        return res.status(200).json({ message: 'Success', savedUser: savedUser })
    } catch (err) {
        return res.status(400).json({ message: err })
    }

}

const login = async (req, res) => {

    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: 'user not found' })

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).json({ message: 'invalid password' })

    const token = jwt.sign({ _id: user._id }, process.env.PASS_PHRASE, { expiresIn: '1h'})
    res.header('auth-token', token).json({ token: token })

}

module.exports = {register, login}