const express = require('express');
const router = express.Router();

const Boleto = require('../models/boleto');
const BoletoBancario = require('../models/boleto-bancario');
const BoletoArrecadacao = require('../models/boleto-arrecadacao');

router.post('/boleto', (req, res) => {
    console.log('Requisitando POST em "/boleto".');
    if (typeof(req.body.linhaDigitavel) !== 'undefined') {
        try { 
            let linhaDigitavel = req.body.linhaDigitavel;
            let boleto = new Boleto(linhaDigitavel);
            res.send({
                estruturaValida: boleto.estruturaValida(),
                tipo: boleto.tipo,
                linhaDigitavel: boleto.linhaDigitavel
            });
        } catch(err) {
            res.status(500);
            res.send({
                error: 'Erro durante processamento da linha digitável.'
            });
        }
    } else {
        res.status(422);
        res.send({
            error: 'Linha digitável não definida.'
        });
    }
});

module.exports = router;
