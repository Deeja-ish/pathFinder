const cors = require("cors");
const dotenv = require("dotenv");
const express = require('express');
const authRoutes = require('./routes/authRoutes')
const aiRoutes = require("./routes/aiRoutes")

const connectDB = require("./config/db")

dotenv.config()

const app = express()

// middleware --cross origin resource sharing
app.use(cors())

// enable express to parse json body
app.use(express.json())

connectDB()

app.get('/', (req, res) => {
    res.send(`PathFinder API is running.....`)
})

app.use("/api/auth", authRoutes)
app.use("/api/ai/", aiRoutes)

// start the server
const port = 5001 || process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});