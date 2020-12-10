const router = require('express').Router();
const authenticate = require('../middleware/verifyToken')

const AuthController = require('../controllers/AuthController')
const NoteController = require('../controllers/NoteController')
const UserController = require('../controllers/UserController')

router.get('/userDetails', authenticate, UserController.userDetails)
router.get('/myNotes', authenticate, NoteController.myNotes)
router.get('/notes/:id', authenticate, NoteController.noteDetails)

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/createNote', authenticate, NoteController.createNote)
router.post('/bulkDeleteNote', authenticate, NoteController.bulkDeleteNote)
router.post('/addCustomTag', authenticate, NoteController.addCustomTag)
router.post('/setUnsetArchiveStatus/:id', authenticate, NoteController.setUnsetArchiveStatus)

router.put('/notes/:id', authenticate, NoteController.deleteNote)
router.put('/updateNote/:id', authenticate, NoteController.updateNote)


module.exports = router