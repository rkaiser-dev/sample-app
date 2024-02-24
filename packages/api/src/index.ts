import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: 'http://localhost:3007',
  })
);

app.get('/sample', (request, response, next) => {
  response.json({ sample: 'value', extra: 'field', more: 'data', again: 'test', another: 'value' });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
