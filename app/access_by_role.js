require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const authentication = (req,res,next) => {
    const body = req.body
    const {is_admin} = body
    if(!is_admin) {
        return res.status(403).json({message:"Access denied: User does not have admin privileges."})
    }
    req.body = { is_admin }
    next()
}
app.post("/products", authentication, (req,res)=>{
    res.status(200).json({message:"Access granted: User has admin privileges."})
})
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server run on ${PORT} port`)
})