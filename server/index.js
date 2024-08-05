const express = require('express');
const path = require('path');
const allRoutes = require('./src/app');
const cors = require('cors');
const {registerAdmin} = require('./src/controllers/controllers');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

app.use(allRoutes);

registerAdmin();

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});