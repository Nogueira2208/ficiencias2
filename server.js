const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const voteFile = 'votes.json';

app.post('/vote', (req, res) => {
  const { imageId } = req.body;
  let votes = {};

  if (fs.existsSync(voteFile)) {
    votes = JSON.parse(fs.readFileSync(voteFile));
  }

  votes[imageId] = (votes[imageId] || 0) + 1;

  fs.writeFileSync(voteFile, JSON.stringify(votes));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
