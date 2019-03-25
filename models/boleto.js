// -*- coding: utf-8 -*-

const _comprimento = 47;
const _digitoArrecadacao = '8';
const _tipo = {
    BANCARIO: 1,
    ARRECADACAO: 2
};

class Boleto {

    constructor(linhaDigitavel) {
        this._linhaDigitavel = linhaDigitavel.trim();
    }

    /*
     * Comprimento padrão da linha digitável (incluindo DVs).
     */
    static get COMPRIMENTO_PADRAO() {
        return _comprimento;
    }

    /*
     * Primeiro digito da linha digitável que define se o tipo do boleto é de arrecadação.
     */
    static get DIGITO_ARRECADACAO() {
        return _digitoArrecadacao;
    }

    /*
     * Tipos de boletos.
     */
    static get Tipo() {
        return _tipo;
    }

    /**
     * Tipo do boleto a partir da linha digitável.
     */
    static tipo(linhaDigitavel) {
        if (linhaDigitavel.charAt(0) === Boleto.DIGITO_ARRECADACAO) {
            return Boleto.Tipo.ARRECADACAO;
        } else {
            return Boleto.Tipo.BANCARIO;
        }
    }

    /**
     * Tipo do boleto atual.
     */
    get tipo() {
        return Boleto.tipo(this._linhaDigitavel);
    }

    get linhaDigitavel() {
        return this._linhaDigitavel;
    }

    set linhaDigitavel(linhaDigitavel) {
        this._linhaDigitavel = linhaDigitavel;
    }

    /**
     * Verifica se o comprimento é válido e se não contém símbolos não numéricos.
     */
    estruturaValida() {
        if (this._linhaDigitavel.length !== Boleto.COMPRIMENTO_PADRAO) {
            // Linha digitável maior que o comprimento padrão.
            return false;
        } else if (/\D/.test(this._linhaDigitavel)) {
            // Linha digitável contém algum caracter não numérico.
            return false;
        } else {
            return true;
        }
    }

}

module.exports = Boleto;
