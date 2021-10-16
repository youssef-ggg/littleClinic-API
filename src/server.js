const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


const {userRoutes,patientRoutes,diagnosisRoutes,appointmentRoutes,
    financialTransactionRouter} = require('./routes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/',userRoutes);
app.use('/',patientRoutes);
app.use('/',diagnosisRoutes);
app.use('/',appointmentRoutes);
app.use('/',financialTransactionRouter);

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Server is listening on port ${process.env.SERVER_PORT}...`);
});


