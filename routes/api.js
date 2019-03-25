const express = require('express');
const router = express.Router();

router.post('/checa_boleto', (req, res) => {
    console.log(req.body);
    res.send('Boleto enviado!');
});

module.exports = router;
