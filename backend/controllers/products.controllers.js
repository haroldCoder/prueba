const products = {};
const {conection} = require("../db/conection");

products.getProducts = async(req,res)=>{
	await conection.query("SELECT * FROM products", (err, result)=>{
        if(err) throw err;
        res.json(result)
    });	
} 
products.createProducts = async(req,res)=>{
	const {name, price, cant} = req.body;
	const products = {
			"name": name,
            "price": price,
            "cant": cant
	};
    conection.query("INSERT INTO products (name, last, email, password) VALUES ?", products, (err, result)=>{
        if(err) throw err
        console("product create")
    })
	
}
products.updateProducts = async(req,res)=>{
    const {id} = req.params;
	const {name, price, cant} = req.body;
    conection.query(`UPDATE products SET name= '${name}', price = ${price}, cant = ${cant} WHERE id = ${id}'`, (err, res)=>{
        if(err) throw err;
        console.log("product update");
    })
	
};
products.deleteProducts = async(req,res)=>{
	const {id} = req.params;
	conection.query(`DELETE FROM products WHERE id = ${id}`, (err, result)=>{
        console.log("product delete");
    });
};

module.exports = products;