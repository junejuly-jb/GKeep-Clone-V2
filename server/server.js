const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors')

// import routes
const apiRoutes = require('./routes/api')

dotenv.config()

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, () => console.log('connected to database!') )



// middleware 
app.use(express.json())
app.use(cors())


// routes middleware 
app.use('/api', apiRoutes)


//handle prod
if (process.env.NODE_ENV === 'production') {
    //static folder
    app.use(express.static(__dirname + '/public'))

    app.get(/.*/, (req, res) => { res.sendFile(__dirname + '/public/index.html')});
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => { console.log(`App is listening at port: ${PORT}`) })