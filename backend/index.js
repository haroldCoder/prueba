const express = require("express");
const app = express()
const cors = require("cors");
app.use(express.json())
app.use(cors())

app.use("/users", require("./routes/users.route.js"))
app.use("/products", require("./routes/product.route.js"))

app.listen(8000, (req, res)=>{
    console.log(`server on port 8000`);
})