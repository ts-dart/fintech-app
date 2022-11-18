import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();
app.use(bodyParser.json());

app.use('/register', router.registerRouter);
app.use('/login', router.loginRouter);
app.use('/balance', router.balanceRouter);
app.use('/operation', router.operationRouter);
app.use('/transactions', router.transactionsRouter);

app.listen(5000, () => console.log('online'));