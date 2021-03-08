const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


const {userRoutes,patientRoutes} = require('./routes');
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/',userRoutes);
app.use('/',patientRoutes);


app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Server is listening on port ${process.env.SERVER_PORT}...`);
});


