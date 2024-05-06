const express = require('express');
const multer = require('multer');

const { v4: uuidv4 } = require('uuid');
const { getUser, userLogin, checkLoginUser, uploadPost, getUsersNews } = require('../controllers/users');
const uploadDirectory = "uploads"

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        const uniqueFilename = uuidv4();
        cb(null, uniqueFilename + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload a valid image file'));
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: fileFilter
});

router.get("/", getUser);
router.post("/signup", userLogin);
router.post("/signin", checkLoginUser);
router.post("/newsFeeds", upload.single('image'), uploadPost);
router.get("/getNewsFeedData", getUsersNews);

module.exports = router;
