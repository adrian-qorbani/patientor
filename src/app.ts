import express from 'express';
import cors from 'cors';
import patientsRouters from './routes/patientsRouters';
import diagnosesRouters from './routes/diagnosesRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.status(200).send('pong');
});

app.use('/api/patients', patientsRouters);
app.use('/api/diagnoses', diagnosesRouters);

export default app;