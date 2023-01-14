const users = {};
const {conection} = require("../db/conection");
const jwt = require("jsonwebtoken");

users.getUsers = async(req,res)=>{
	await conection.query("SELECT * FROM users", (err, result)=>{
        res.json(result)
    });	
} 
users.createUsers = async(req,res)=>{
	const {name, last, email, password} = req.body;
    
    const token = jwt.sign(name, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
    conection.query(`INSERT INTO users (name, last, email, password, token) VALUES ("${name}", "${last}", "${email}", "${password}", "${token}")`, (err, result)=>{
        if(err) throw err
        console.log("user create")
        res.json({data: {"nombre": name, apellido: last, correo: email, }, token: {"access_token": token}});
    })
	
}

module.exports = users;