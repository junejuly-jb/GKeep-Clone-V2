const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) { 

    const token = req.header('auth-token')

    try {
        const verify = jwt.verify(token, process.env.PASS_PHRASE)
        req.user = verify
        next()
    } catch (err) { 
        
        return res.status(401).json({message: 'invalid token'})

    }

}