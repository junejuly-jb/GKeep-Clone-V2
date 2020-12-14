const User = require('../model/User')

const userDetails = async (req, res) => {

    const user = await User.find({ _id: req.user })
    return res.status(200).send(user)

}


const darkModeToggler = async (req, res) => {

    await User.findOneAndUpdate({ _id: req.user }, { $set: { "options.darkmode": req.body.val } }, { returnOriginal: false, useFindAndModify: false }, (err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ message: 'settings updated', option: doc.options })
    })
    
}
module.exports = {userDetails, darkModeToggler}