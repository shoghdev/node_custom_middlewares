require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const users = [
    {
        "user_id":100
    }
]
const middlware1 = (req,res,next)=>{
    const body = req.body
    const {user_id} = body
    if(!user_id) {
        return res.status(403).json("There isn't user")
    }
    next()
}
const middlware2 = (req,res,next)=>{
    const body = req.body
    const {user_id} = body
    const userExists = users.some((user) => user.user_id === user_id)
    if (!userExists) {
        return res.status(403).json({ message: "User is not allowed." })
    }
    next()
}
app.post("/orders",middlware1,middlware2, (req,res)=>{
    res.status(200).json({message:"User is allowed to place an order."})
})
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server run on ${PORT}`)
})