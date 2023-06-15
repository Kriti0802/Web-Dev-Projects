import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/questionRoutes.js';
import './database/db.js';

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
