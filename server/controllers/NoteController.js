const User = require('../model/User')


const createNote = (req, res) => { 

    const newNote = {
        title: req.body.title,
        content: req.body.content,
    }

    User.findOne({ _id: req.user._id })
        
        .then((record) => { 
            record.notes.push(newNote)
            const updatedUserNote = record.save()
            return res.status(200).json({message: 'Note added!'})
        })

}


const myNotes = (req, res) => { 

    User.findOne({ _id: req.user })
        
    .then(response => { 

        return res.status(200).json(response.notes)

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
        await User.update({ _id: req.user }, { $pull: { "notes": { _id: req.params.id } } }, {multi: true})
            .then(() => { return res.status(200).send('Success') })
            .catch(err => { return res.status(500).send('error deleting note') })
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
            return res.status(200).json({ message: 'tag added!' })
                
        .catch(err => { return res.send(err)})
    })

}

const setUnsetArchiveStatus = async (req, res) => {

    // return res.send(req.body.status)

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

module.exports = {
    createNote, myNotes, noteDetails, deleteNote,
    updateNote, bulkDeleteNote, addCustomTag,
    setUnsetArchiveStatus
}