const User = require('../model/User')

const userDetails = async (req, res) => {

    const user = await User.find({ _id: req.user })
    return res.status(200).send(user)

}

module.exports = {userDetails}