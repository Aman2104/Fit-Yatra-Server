const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "mel-jol-app.appspot.com"
});

const storage = admin.storage();
const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/imageUpload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No image uploaded');
    }

    const originalFilename = req.file.originalname;
    const contentType = req.file.mimetype;

    try {
        const bucket = storage.bucket();
        const imageRef = bucket.file(originalFilename);

        await imageRef.save(req.file.buffer, {
            contentType,
            metadata: {
                firebaseStorageDownloadTokens: uuidv4() 
            }
        });
        const imagePath = await imageRef.getSignedUrl({
            action: 'read',
            expires: '03-09-2491' 
        }).then(urls => urls[0]);

        res.json({ imagePath: imagePath });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading image');
    }
});

module.exports = router;





// const storage = multer.diskStorage({
//     destination: 'public/images',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname); 
//     },
// });
// const upload = multer({ storage: storage });

// router.post('/imageUpload', upload.single('image'), (req, res) => {
//     console.log(req);
//     if (!req.file) {
//         res.status(400).json({ error: 'No image file provided' });
//     } else {
//         const imagePath = '/images/' + req.file.filename;
//         res.json({ imagePath: imagePath });
//     }
// });

