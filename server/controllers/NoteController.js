const User = require('../model/User')
const { noteValidation } = require('../validation')
const notifier = require('node-notifier');


const createNote = (req, res) => { 

    const { error } = noteValidation(req.body)
    if (error) return res.status(400).json({ success: false, message: error.details[0].message })

    const newNote = {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags
    }

    User.findOneAndUpdate({ _id: req.user._id }, { $push: { notes: { $each: [newNote], $position: 0 } } }, { returnOriginal: false, useFindAndModify: false },
        (err, doc) => {
            if (err) return res.status(500).send(err)

            const latest_note = doc.notes[0]
            return res.status(200).json({ message: 'Note added', data: latest_note})
    })

}


const myNotes = async (req, res) => { 

    User.findOne({ _id: req.user })

        .then(response => {
            // notifier.notify('Message'); 
            // notifier.notify({
            //     title: 'Sample',
            //     message: 'Hello, there! Im a sample notification'
            // }); 
            return res.status(200).json(response.notes)
            // String
            

        })

        .catch(err => {

            return res.status(400).send(err)

        })
}

const noteDetails = async (req, res) => { 

    // return res.status(200).json(req.params.id)
    const result = await User.findOne({ "_id": req.user }, { notes: {$elemMatch: {_id: req.params.id}} })
    return res.status(200).send(result.notes)

}

const deleteNote = async (req, res) =>
    {
    await User.updateOne({ _id: req.user }, { $pull: { "notes": { _id: req.body.note_id } } }, {multi: true})
            .then(() => { return res.status(200).json('Successfully deleted!') })
            .catch(err => { return res.status(500).json('error deleting note') })
    }


const updateNote = async (req, res) =>
{

    const user = await User.find({ _id: req.user, "notes._id": req.params.id })
    if(user.length == 0) return res.status(201).send('unable to edit this note')

    User.findOneAndUpdate({ _id: req.user, 'notes._id': req.params.id },{ $set: {"notes.$.title": req.body.title,"notes.$.content": req.body.content,}},
        { returnOriginal: false, useFindAndModify: false }, (err, doc) => { 
            if (err) return res.status(500).send('an error occured')
            return res.status(200).send(doc)
        })
}

const bulkDeleteNote = async (req, res) => { 
    

    // return res.status(200).send(req.body.noteId)
    await User.updateMany({ _id: req.user }, { $pull: { "notes": { _id: req.body.noteId }}})
        .then(response => {
        return res.status(200).json({message: 'Deleted successfully'})
        })
        .catch(err => {
        return res.status(500).json({message: 'error occured'})
    })
}

const addCustomTag = async (req, res) => {

    await User.findOne({ _id: req.user })
        .then(record => {
            record.customTags.push(req.body.tag)
            record.save()
            return res.status(200).json({ message: 'tag added!', tag: req.body.tag })
        })
        .catch(err => { return res.send(err) })

}

const setUnsetArchiveStatus = async (req, res) => {

    if (req.body.status == true) {
        await User.findOneAndUpdate({ _id: req.user, "notes._id": req.params.id }, { $set: { "notes.$.archive": false } },
            { returnOriginal: false, useFindAndModify: false }, (err, document) => { 
                if(err) return res.status(500).send(err)
                return res.status(200).send(document)
        })
    }
    else {
        await User.findOneAndUpdate({ _id: req.user, "notes._id": req.params.id }, { $set: { "notes.$.archive": true } },
            { returnOriginal: false, useFindAndModify: false }, (err, document) => {
                if (err) return res.status(500).send(err)
                return res.status(200).send(document)
        })
    }

}


const deleteLabel = async (req, res) => {

     await User.updateOne({ _id: req.user }, { $pullAll: { customTags: [req.body.tag] } })
        .then(() => {
            User.findOne({ _id: req.user })
                .then(document => {
                    // document.note.tags[].splice(req.body.index, 1)
                    // document.save()
                    // return res.status(200).json(document.notes[1].tags)
                    
                    for (let i = 0; i < document.notes.length; i++){
                        
                        let result = document.notes[i].tags.filter(tag => tag != req.body.tag)
                        document.notes[i].tags = []
                        document.notes[i].tags = result.concat(document.notes[i].tags)
                        
                    }
                    document.save()
                    return res.status(200).json('success')
                    
            })
        })

}

const editNoteWithExistingLabel = async (req, res) => {
    
    await User.findOneAndUpdate({ _id: req.user, "notes._id": req.body.id }, { $set: { "notes.$.tags": [] } }, {})
        .then(() => {
            User.findOneAndUpdate({ _id: req.user, "notes._id": req.body.id }, { $set: { "notes.$.tags": req.body.tags } }, { returnOriginal: false, useFindAndModify: false },
                (err) => {
                if(err) return res.status(500).send(err)
                return res.status(200).json({ message: 'Tag edited successfully'})
            })
    })
}

const removeSingleNoteTag = async (req, res) => {
    console.log(req.params.id)
    console.log(req.body.tag)
    await User.findOneAndUpdate({ _id: req.user, "notes._id": req.params.id }, { $pull: { "notes.$.tags": req.body.tag } }, {
        useFindAndModify: false
    }, (err) => {
        if (err) return res.status(500).send(err)
            return res.status(200).json({ message: 'Tag deleted' })
    })
}

const colorUpdate = async (req, res) => {

    try {
        await User.findOneAndUpdate({ _id: req.user, "notes._id": req.params.id }, { $set: { "notes.$.color": req.body.color }, },
        { returnOriginal: false, useFindAndModify: false })
            .then(response => {
            return res.status(200).json(response)
        })
    } catch (error) {
        return res.status(400).json(error)
    }
}

const updateCustomTag = async (req, res) => {
    // await User.updateOne({ _id: req.user }, { $pull: { customTags: req.body.oldTag } })
    //     .then(() => {
    //         User.updateOne({ _id: req.user }, { $push: { customTags: req.body.tag } })
    //             .then(() => {
    //                 User.findOne({ _id: req.user })
    //                 .then(document => {
                        
    //                     // console.log(doc.notes)
    //                     for (let i = 0; i < document.notes.length; i++){
    //                         let index = document.notes[i].tags.indexOf(req.body.oldTag)
    //                         document.notes[i].tags[index] = req.body.tag
                        
    //                     }
    //                     // document.markModified('document')
    //                     document.save()
    //                     console.log(document.notes)
    //                     return res.status(200).json({ message: 'Tag updated' })
    //                 })
    //             })
    //     })

    await User.updateOne({ _id: req.user }, { $pull: { customTags: req.body.oldTag } })
        .then(() => {
            User.findOne({ _id: req.user })
            .then(record => {
                record.customTags.push(req.body.tag)
                
                for (let i = 0; i < record.notes.length; i++){
                    let index = record.notes[i].tags.indexOf(req.body.oldTag)
                    record.notes[i].tags[index] = req.body.tag
                }
                record.markModified('notes')
                record.save()
                return res.status(200).json({ message: 'Tag updated' })
                
            })
    })
}

module.exports = {
    createNote, myNotes, noteDetails, deleteNote, updateNote, bulkDeleteNote, addCustomTag, setUnsetArchiveStatus, deleteLabel, editNoteWithExistingLabel, removeSingleNoteTag, colorUpdate, updateCustomTag
}