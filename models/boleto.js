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

    //======================== Métodos Estáticos ========================
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
     * Função auxiliar para soma de digitos de um número.
     */
    static somaDigitos(numero) {
        if (numero == null) {
            return 0;
        } else {
            let soma = 0;
            let algarismos = Number(numero).toString();
            for (let i = 0; i < algarismos.length; i++) {
                soma += parseInt(algarismos.charAt(i));
            }
            return soma;
        }
    }

    /**
     * Calcula o valor do dígito verificador usando o módulo 10.
     */
    static digitoVerifMod10(campo) {
        let soma = 0;
        for (let i = campo.length - 1; i >= 0; i--) {
            if ((campo.length - 1 - i) % 2 === 0) {
                let prod = 2 * parseInt(campo.charAt(i));
                if (prod >= 10) {
                    prod = Boleto.somaDigitos(prod);
                }
                soma += prod;
            } else {
                soma += parseInt(campo.charAt(i));
            }
        }
        let dv = 10 - (soma % 10);
        return dv;
    }
    //======================== Métodos Estáticos ========================

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
