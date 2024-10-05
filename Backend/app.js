import express from "express";
import cors from "cors";
//import authRouter from './src/routes/auth.routes.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//app.use("/auth", authRouter)




app.listen(port, () => {
    console.log("Listening on port ", port);
})