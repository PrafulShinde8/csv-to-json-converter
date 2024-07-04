const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

dotenv.config();

console.log("Mongo URI:", process.env.mongoURI); // Log the Mongo URI to ensure it's correct

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect(process.env.mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


