const express = require('express');
const cors = require('cors');
require('dotenv').config();

// import routes
const userRoutes = require('./routes/UserRoutes');
const feedbackRoutes = require('./routes/FeedbackRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const PublicRoutes = require('./routes/PublicRoutes');


// port number
const port = process.env.DB_PORT;

const app = express();

app.use(express.json());
app.use(cors());

// require image folder
app.use('/assets', express.static('assets'));

// routers
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', PublicRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to e-commerce system backend!");
});

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});