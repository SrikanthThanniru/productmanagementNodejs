const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())


//routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes)

//DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("mongoDB connected"))
    .catch((err)=> console.error("mongoDB connection:", err))


//server
const port = process.env.port || 5000
app.listen(port, ()=> console.log("server connected good"))