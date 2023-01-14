const users = {};
const {conection} = require("../db/conection");

users.getUsers = async(req,res)=>{
	await conection.query("SELECT * FROM users", (err, result)=>{
        res.json(result)
    });	
} 
users.createUsers = async(req,res)=>{
	const {name, last, email, password} = req.body;
    conection.query(`INSERT INTO users (name, last, email, password) VALUES ("${name}", "${last}", "${email}", "${password}")`, (err, result)=>{
        if(err) throw err
        console.log("user create")
        res.json("note create");
    })
	
}
users.updateUsers = async(req,res)=>{
    const {id} = req.params;
	const {name, last, email, password} = req.body;
	const userses = {
        "name": name,
        "last": last,
        "email": email,
        "password": password
    };
    conection.query(`UPDATE users SET name= '${name}', last= '${last}', email= '${email}', password= '${password} WHERE id = ${id}`)
	res.json({"id": req.params.id});
};
users.deleteUsers = async(req,res)=>{
	const {id} = req.params;
	conection.query(`DELETE FROM users WHERE id = ${id}`, (err, result)=>{
        console.log("user delete");
    });
	res.json("note remove");
};

module.exports = users;