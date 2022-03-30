const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()

const Router = require('./Router');
const PORT = process.env.PORT || 4000
const app = express()

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3002',
        'http://localhost:4000',
        'http://localhost:3001'
    ],
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.json())
app.use("/", Router)




const start = async () => {
    try {
        app.listen(PORT, () => console.log('server start:', PORT))
        await mongoose.connect(process.env.DB_URL)
        console.log("login");
    }
    catch (e) {
        console.log(e);
    }
}

start();

