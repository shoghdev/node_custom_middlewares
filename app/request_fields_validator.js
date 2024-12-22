require("dotenv").config()
const express = require("express")
const bodyParser = require('body-parser')
const app = express()
let users = []
app.use(bodyParser.json())
const userValidator = (req, res, next) => {
    const { username, email, password} = req.body
    if(!username || username.length < 3){
        return res.status(403).json({message:"Usernamelenght must be at least 3 characters"})
    }
    if(!email || !email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        return res.status(403).json({message:"Not a valid email"})
    }
    if(!password || password.length < 6){
        return res.status(403).json({message:"Pasword mast be at least 6 chars"})
    }
    req.body = { username, email, password }
    next()
}
app.post("/users",userValidator,(req,res)=>{
    const user =req.body
    users.push(user)
    const {password:_, ...withoutPassword} = user
    res.status(201).json(withoutPassword);
})
app.get('/users', (req, res) => {
    res.send(users);
  })
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server run on ${PORT}`)
})