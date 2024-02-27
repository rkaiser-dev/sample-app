import cors from 'cors';
import express from 'express';
import { writeSample, readSample } from './data/client';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: 'http://localhost:3007',
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.get('/convention', async (request, response, next) => {
  try {
    const result = await readSample();
    response.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post('/convention', async (request, response, next) => {
  try {
    await writeSample();
    response.status(201).json({});
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
