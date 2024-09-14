const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');

const app = express();
const stripe = Stripe('YOUR_STRIPE_SECRET_KEY'); // Add your Stripe secret key here

app.use(express.static('public'));
app.use(express.json());

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Serve the product files
app.get('/download/:file', (req, res) => {
    const file = req.params.file;
    const filePath = path.join(__dirname, 'uploads', file);
    res.download(filePath);
});

// Handle file uploads (admin side)
app.post('/upload', upload.single('file'), (req, res) => {
    res.send({ message: 'File uploaded successfully', file: req.file });
});

// Handle Stripe payment
app.post('/purchase', async (req, res) => {
    const { productId, email } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, // Example: $10.00
        currency: 'usd',
        receipt_email: email,
        metadata: { productId }
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
        downloadLink: `/download/${productId}` // Temporary link
    });
});

// Static page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
