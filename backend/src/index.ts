import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/register', router.registerRouter);
app.use('/login', router.loginRouter);
app.use('/balance', router.balanceRouter);
app.use('/operation', router.operationRouter);
app.use('/transactions', router.transactionsRouter);

const PORT = !process.env.PORT ? 3001 : process.env.PORT;
app.listen(PORT, () => console.log(`online na porta ${PORT}`));