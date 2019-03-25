let _comprimento = 47;
let _digitoArrecadacao = '8';
let _tipo = {
    BANCARIO: 1,
    ARRECADACAO: 2
};

class Boleto {

    constructor(linhaDigitavel) {
        this._linhaDigitavel = linhaDigitavel;
    }

    static get COMPRIMENTO() {
        return _comprimento;
    }

    static get DIGITO_ARRECADACAO() {
        return _digitoArrecadacao;
    }

    static get Tipo() {
        return _tipo;
    }

    static tipo(linhaDigitavel) {
        if (linhaDigitavel.charAt(0) === Boleto.DIGITO_ARRECADACAO) {
            return Boleto.Tipo.ARRECADACAO;
        } else {
            return Boleto.Tipo.BANCARIO;
        }
    }

    get tipo() {
        return Boleto.tipo(this._linhaDigitavel);
    }

    get linhaDigitavel() {
        return this._linhaDigitavel;
    }

    set linhaDigitavel(linhaDigitavel) {
        this._linhaDigitavel = linhaDigitavel;
    }

}

module.exports = Boleto;
