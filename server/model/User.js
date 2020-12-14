const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({


    // id: mongoose.Schema.ObjectId,
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    pinned: {
        type: Boolean,
        default: false
    },
    tags: Array,
    archive: {
        type: Boolean,
        default: false
    }

})

// const optionsSchema = new mongoose.Schema({
//     darkMode: {
//         type: Boolean,
//         default: false
//     },
//     listView: {
//         type: Boolean,
//         default: false
//     }
// })


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    notes: [noteSchema],
    options: {
        darkmode: { type: Boolean, default: false },
        listView: { type: Boolean, default: false },
    },
    customTags: [],
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('User', userSchema);