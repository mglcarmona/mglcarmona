import express from 'express';
import html from './template.html';

const app = express();

app.get('/', (req, res) => {
  res.send(html());
});

app.listen(3000, err => {
  if (err) console.log(err);
  console.log('app running at http://127.0.0.1:3000');
});
