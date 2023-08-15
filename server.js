const  express = require("express")
const cors = require("cors")
const colors = require("colors")
const morgan = require("morgan")
const dotenv = require("dotenv") 
const connectDB = require("./config/connectDB")
const userRoutes = require("./routes/userRoute")
const transactionRoute = require("./routes/transactionRoute")
const path = require("path")


//config dotenv file
dotenv.config()


//database call
connectDB()

//rest
const app = express()


//middleware 
app.use(morgan('dev'))
app.use(express.json())
app.use(cors()) 


//routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/transections', transactionRoute)

//static
app.use(express.static(path.join(__dirname, './client/dist')))
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})

//port  
const port = 8080 || process.env.PORT 

app.listen(port, ()=> console.log("server running on port "+ port ) ) 