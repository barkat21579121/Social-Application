const express = require('express')
const { getUser, userLogin, checkLoginUser } = require('../controllers/users')

const router = express.Router()

router.get("/", getUser)
router.post("/signup", userLogin)
router.post("/Signin", checkLoginUser)



module.exports = router
