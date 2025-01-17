const express = require('express');
const router = require('./Source/routes/routes');
const app = express()
// require("./uploads")
var cors = require('cors')

app.use(cors())
require('dotenv').config()
app.use(express.json())
app.use(express.static('./uploads'))
const PORT = process.env.PORT
app.use("/users/api", router)
app.listen(PORT, () => {
    console.log(`app is runing on post ${PORT}`)
})