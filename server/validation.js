const Joi = require('joi')

const registerValidation = (data) => {

    const schema = Joi.object({

        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        notes: Joi.array()
        
    })

    return schema.validate(data);

}


const loginValidation = (data) => {

    const schema = Joi.object({

        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    })

    return schema.validate(data);

}


const noteValidation = (data) => { 

    const schema = Joi.object({

        title: Joi.string().required(),
        content: Joi.string().required()

    })

    return schema.validate(data)

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.noteValidation = noteValidation;