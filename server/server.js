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

const PORT = process.env.PORT || 3000


// middleware 
app.use(express.json())
app.use(cors())


// routes middleware 
app.use('/api', apiRoutes)


app.listen(PORT, () => { console.log(`App is listening at port: ${PORT}`) })