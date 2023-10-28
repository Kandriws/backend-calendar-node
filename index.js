const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const morgan = require('morgan');

const app = express();


//MORGAN
app.use(morgan('combined'));
// DB
dbConnection();

// CORS
app.use(cors());

// Public directory
app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/event'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


