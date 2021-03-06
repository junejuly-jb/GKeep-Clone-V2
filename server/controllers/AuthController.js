const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation');


const register = async (req, res) => {
    const { error } = registerValidation(req.body)
    if (error) return res.json({ success: false, message: error.details[0].message})

    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.json({ success: false, message: 'email already exists' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    var name = req.body.name
    var getInitials = function (name) {
    var parts = name.split(' ')
    var initials = ''
        for (var i = 0; i < parts.length; i++) {
            if (parts[i].length > 0 && parts[i] !== '') {
                initials += parts[i][0]
            }
        }
        return initials
    }
    var user_initials = getInitials(name);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        initials: user_initials,
        password: hashedPassword,
        notes: []
    })

    try {
        await user.save()
        return res.status(200).json({ success: true, message: 'Success!',})
    } catch (err) {
        return res.status(400).json({ message: err })
    }

}

const login = async (req, res) => {

    const { error } = loginValidation(req.body)
    if (error) return res.json({ success: false, message: error.details[0].message })

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.json({ success: false, message: 'User not found' })

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.json({ success: false, message: 'User not found' })

    const token = jwt.sign({ _id: user._id }, process.env.PASS_PHRASE, { expiresIn: '1h' })
    const exp = jwt.decode(token)

    return res.status(200).json({ token: token, exp: exp.exp, user })
}

module.exports = {register, login}