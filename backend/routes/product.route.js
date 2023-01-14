const {Router} = require("express");
const router = Router()
const {getProducts, createProducts, updateProducts, deleteProducts} = require("../controllers/products.controllers")

router.route("/")
.get(getProducts)
.post(createProducts);

router.route("/:id")
.put(updateProducts)
.delete(deleteProducts);

module.exports = router