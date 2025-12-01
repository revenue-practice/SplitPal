require('dotenv').config();
require('./models/pool');

const express = require('express');
const authRouter = require('./routes/auth.route');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});