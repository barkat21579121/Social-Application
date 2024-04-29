const express = require('express')
const { getUser, userLogin, checkLoginUser, uploadPost, getUsersNews } = require('../controllers/users')

const router = express.Router()

router.get("/", getUser)
router.post("/signup", userLogin)
router.post("/Signin", checkLoginUser)
router.post("/newsFeeds", uploadPost)
router.get("/getNewsFeedData", getUsersNews)




module.exports = router
