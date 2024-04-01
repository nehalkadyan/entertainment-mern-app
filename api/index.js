const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors")
const authRouter = require("./routes/user.routes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// configuration for .env file
dotenv.config();

const app = express();

// middleware to parse the json object
app.use(express.json())
app.use(express.static('public'));


// middleware for cross origin resource sharing
app.use(cors())

const options = {
    definition : {
      openapi : '3.0.0',
      info : {
        title : 'Documentation : Entertainment App',
        version : "1.0"
      },
      servers : [
        {
          url : "https://fullstack-movie-app.onrender.com/",
        }
      ]
    },
    apis : ["./routes/user.routes.js"]
  }
  
  const swaggerSpec = swaggerJSDoc(options)
  console.log(JSON.stringify(swaggerSpec, null, 2));

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

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


