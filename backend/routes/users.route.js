const {Router} = require("express");
const router = Router()
const {getUsers, createUsers} = require("../controllers/users.controllers")

router.route("/")
.get(getUsers)
.post(createUsers);


module.exports = router;

