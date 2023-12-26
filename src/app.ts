import express from 'express';
import { Application } from "express";
import dotenv from "dotenv";

import cors from 'cors';
import patientsRouters from './routes/patientsRouters';
import diagnosesRouters from './routes/diagnosesRouter';
import userRouter from './routes/userRouter'
import loginRouter from './routes/loginRouter'


const app: Application = express();

// const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.status(200).send('pong');
});

app.use('/api/patients', patientsRouters);
app.use('/api/diagnoses', diagnosesRouters);
app.use('/', userRouter)
app.use('/', loginRouter)


export default app;