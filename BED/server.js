/*
in BED location
npm init -y
npm i express nodemon cors bcrypt jsonwebtoken mongoose dotenv
*/
const express=require('express')
const userRoutes=require('./routes/userRoutes')
const app=express() //instance of express
const mongoose=require("mongoose")
const cors=require("cors")
const authRoute=require("./routes/validationRoutes")
const postRoutes=require("./routes/postRoutes")

const PORT=5000;

const db=mongoose.connect("mongodb+srv://12345:12345@cluster0.wbn6stw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.use(express.json())//express server json data req mae accept karae ess liyae
app.use(cors())//cross origin resouse source, backend and frontend different-2 port pae run kartae hai, toh unmae data share hoo sakae esss liyae eska use kiya jaaata hai


app.use('/socialMedia/user',userRoutes)
app.use('/socialMedia/authToken',authRoute)
app.use('/socialMedia/posts',postRoutes)



app.listen(PORT,()=>console.log(`Server is running at port: ${PORT}`))