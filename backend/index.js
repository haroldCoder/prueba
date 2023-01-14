const express = require("express");
const app = express()
const cors = require("cors");
app.use(express.json())
app.use(cors())
const jwt = require("jsonwebtoken");

app.use("/users", require("./routes/users.route.js"))
app.use("/products", require("./routes/product.route.js"))

app.post("/users/login",(req,res)=>{
    const token = req.body.token

    if(token){
        
        const decode = jwt.decode(token);
 
        //  Return response with decode data
        res.json({
            mesagge: "ok",
            token: {"access_token": token}
        });
        console.log({
            mesagge: "ok",
            token: {"access_token": token}
        });
    }
})

app.listen(8000, (req, res)=>{
    console.log(`server on port 8000`);
})