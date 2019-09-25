import express from 'express';

let app = express();

app.use(express.static('/public'));

app.get('/*', (req, res) => {
  res.send('hey there')
});

app.listen(3000, () => {
  console.log('listening on port 3000')
})