require('dotenv').config();
require('./models/pool');

const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const groupsRouter = require('./routes/groups.route');
const expensesRouter = require('./routes/expenses.route');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/groups', groupsRouter);
app.use('/expenses', expensesRouter);

app.get('/', () => {
    res.send('App is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});