const express = require('express');
const bodyParser = require('body-parser');

const port = 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));
app.listen(port, () => {
    console.log(`Escutando a porta ${port}...`);
});
