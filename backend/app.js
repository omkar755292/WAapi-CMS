const express = require('express');
const env = require('dotenv');
const adminAuthRouter = require('./routes/adminAuthRoutes');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const DBConnect = require('./config/connectionDB');
const userRouter = require('./routes/userRotes');
const planRouter = require('./routes/planRoutes');
const complaintRouter = require('./routes/complaintRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const agentRouter = require('./routes/agentRoutes');
const uploadRouter = require('./routes/uploadRoter');


env.config() //Configuring Hostname and Port
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 5000;

DBConnect();

// middleware and routes
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/upload', uploadRouter);
app.use('/auth/admin', adminAuthRouter);
app.use('/api/user', userRouter);
app.use('/api/plan', planRouter);
app.use('/api/complaint', complaintRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/agent', agentRouter);
app.use(errorHandler);

app.listen(port, (req, res) => {
    console.log(`server listen on port http://${hostname}:${port}`);
});