import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/teste', (_req, res) => res.status(200).json('API responding))
app.use('/register', router.registerRouter);
app.use('/login', router.loginRouter);
app.use('/balance', router.balanceRouter);
app.use('/operation', router.operationRouter);
app.use('/transactions', router.transactionsRouter);

const API_PORT = !process.env.API_PORT ? 3001 : process.env.API_PORT;
app.listen(API_PORT, () => console.log(`online na porta ${API_PORT}`));
