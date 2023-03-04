const express = require('express');
// const cors = require('cors');
const dotenv = require('dotenv');


const { userRoutes, patientRoutes, diagnosisRoutes, appointmentRoutes,
    financialTransactionRouter, accessRightsRouter } = require('./routes');

dotenv.config();
const app = express();
const hostname = 'localhost';
// const hostname = '127.0.0.1'
// app.use(cors({
//     origin:'*'
// }));

app.use(express.json());
app.use('/', userRoutes);
app.use('/', patientRoutes);
app.use('/', diagnosisRoutes);
app.use('/', appointmentRoutes);
app.use('/', financialTransactionRouter);
app.use('/', accessRightsRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running at:${hostname}:${process.env.SERVER_PORT}...`);
});


