const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express()
const port = 5000

const bookRoutes = require('./routes/bookRoutes');


app.use(express.json());  // Middleware to parse JSON bodies

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', bookRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// app.js
// require('dotenv').config();





