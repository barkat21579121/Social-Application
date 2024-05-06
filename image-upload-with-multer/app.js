const express = require('express');
const multer = require('multer');
const Jimp = require('jimp');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001;
const uploadDirectory = process.env.UPLOAD_DIRECTORY || 'uploads';

app.use(express.json());

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

app.post('/image', upload.single('upload'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No image uploaded.');
        }

        const image = await Jimp.read(req.file.path);
        await image.resize(250, 250).writeAsync(uploadDirectory + `/resized-${req.file.filename}`);

        fs.unlinkSync(req.file.path);

        res.status(201).send({
            message: 'Image uploaded successfully',
            imageUrl: `${req.protocol}://${req.get('host')}/resized-${req.file.filename}`
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/', (req, res) => {
    res.send(`App is running on port ${port}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
