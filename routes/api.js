const express = require('express');
const router = express.Router();

const Boleto = require('../models/boleto');
const BoletoBancario = require('../models/boleto-bancario');
const BoletoArrecadacao = require('../models/boleto-arrecadacao');

router.post('/boleto', (req, res) => {
    console.log(`Requisitando ${req.method} em "${req.url}".`);
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
            let vencimento = boleto.vencimento;
            let dados = {
                valido: valido,
                valor: valor,
                vencimento: vencimento != null ? vencimento.toString() : null,
                linhaDigitavel: valido ? boleto.linhaDigitavel : null
            };
            res.send(dados);
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
