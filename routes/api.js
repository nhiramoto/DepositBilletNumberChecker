const express = require('express');
const router = express.Router();

const Boleto = require('../models/boleto');
const BoletoBancario = require('../models/boleto-bancario');
const BoletoArrecadacao = require('../models/boleto-arrecadacao');

router.post('/checa_boleto', (req, res) => {
    console.log('Requisitando POST em "/checa_boleto".');
    if (typeof(req.body.linhaDigitavel) !== 'undefined') {
        let linhaDigitavel = req.body.linhaDigitavel;
        let boleto = new Boleto(linhaDigitavel);
        res.send({
            estruturaValida: boleto.estruturaValida(),
            tipo: boleto.tipo,
            linhaDigitavel: boleto.linhaDigitavel
        });
    } else {
        res.send({
            valido: false,
            msg: 'Linha digitável não definida.'
        });
    }
});

module.exports = router;
