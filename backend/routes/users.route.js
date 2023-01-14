const {Router} = require("express");
const router = Router()
const {getUsers, createUsers, updateUsers, deleteUsers} = require("../controllers/users.controllers")

router.route("/")
.get(getUsers)
.post(createUsers);

router.route("/:id")
.put(updateUsers)
.delete(deleteUsers);

module.exports = router;

