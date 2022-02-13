const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const path = require('path');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(process.env.PORT);
  console.log('Node server running on port 8080');
});
