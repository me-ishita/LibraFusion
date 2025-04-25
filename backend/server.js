const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToMongo = require('./db');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/bookRoutes'); // Import book routes
const multer = require('multer');
const path = require('path');
require('dotenv').config();


const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use('/api/books', bookRoutes); // Use book routes
app.use('/api/users', authRoutes); // Use user routes

connectToMongo();


app.use('/api/auth', authRoutes);
app.use('/api/', require('./routes/bookRoutes'));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

app.post('/api/uploadprofileimage', upload.single('profileImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send({ imageUrl: `/uploads/${req.file.filename}` });
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5007;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
