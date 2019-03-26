const express = require('express');
const router = express.Router();

const Boleto = require('../models/boleto');
const BoletoBancario = require('../models/boleto-bancario');
const BoletoArrecadacao = require('../models/boleto-arrecadacao');

router.post('/boleto', (req, res) => {
    console.log(`Requisitando ${req.method} em "${req.url}".`);
    res.set('Content-type', 'application/json');
    if (typeof(req.body.linhaDigitavel) !== 'undefined') {
        try { 
            let linhaDigitavel = req.body.linhaDigitavel;
            let tipo = Boleto.tipo(linhaDigitavel);
            let boleto;
            if (tipo === Boleto.Tipo.BANCARIO) {
                boleto = new BoletoBancario(linhaDigitavel);
            } else {
                boleto = new BoletoArrecadacao(linhaDigitavel);
            }
            let valido = boleto.ehValido;
            let valor = boleto.valor
            let vencData = boleto.vencimento;
            let vencStr = null;
            if (vencData) {
                vencStr = `${vencData.getFullYear()}-${vencData.getMonth() + 1}-${vencData.getDate()}`;
            }
            let dados = {
                valido: valido,
                valor: valor,
                vencimento: vencStr,
                linhaDigitavel: boleto.linhaDigitavel
            };
            res.json(dados);
        } catch(err) {
            res.status(500);
            res.json({
                error: 'Erro durante processamento da linha digitável.'
            });
        }
    } else {
        res.status(422);
        res.json({
            error: 'Linha digitável não definida.'
        });
    }
});

module.exports = router;
