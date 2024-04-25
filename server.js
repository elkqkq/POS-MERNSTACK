const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotanv = require("dotenv")
const { bgCyan } = require("colors")
require("colors");
const connectDb = require("./config/config")
//dotenv config
dotanv.config();
//db config
connectDb();

// other object
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan("dev")) 

//routes
app.get("/", (req, res) => {
    res.send("Hello World")
})
//port
const PORT = process.env.PORT || 8080


//listen
app.listen (PORT, () => {
    console.log(`Server Running on Port ${PORT}` .bgCyan.white);
});