require("dotenv").config()
const express = require("express")
const bodyParser = require('body-parser')
const app = express()
let users = []
app.use(bodyParser.json())
const reqLogging = (req,res,next) => {
    const date = new Date(Date.now())
    const url = req.url
    const method = req.method
    req.body= {date,url,method}
    next()
}
app.post("/users",reqLogging,(req,res)=>{
    const user =req.body
    users.push(user)
    res.status(201).json(withoutPassword);
})
app.get("/users", reqLogging, (req,res)=>{
    const data = req.body
    const {date, url, method} = data
    res.status(200).send(console.log(`${date}, Method: ${method}, url:${url}`))

})
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server run on ${PORT}`)
})