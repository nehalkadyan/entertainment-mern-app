const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors")
const authRouter = require("./routes/user.routes");

// configuration for .env file
dotenv.config();

const app = express();

// middleware to parse the json object
app.use(express.json())

// middleware for cross origin resource sharing
app.use(cors())

// conecting the database with mongoose
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to db")
}).catch((err) => {
    console.log(err)
})

// endpoint for auth apis
app.use("/api/auth", authRouter);

// testing
app.use("/test" , (req, res) => {
    res.json({message : "testing on the browser"})
})


app.listen(5000, () => {
    console.log("Server is listening on port 5000")
})


