const Boleto = require('./boleto');

class BoletoArrecadacao extends Boleto {

    constructor(linhaDigitavel) {
        super(linhaDigitavel);
    }

    static digitoVerifMod11(campo) {
        let soma = 0, prod;
        let peso = [2, 3, 4, 5, 6, 7, 8, 9], indPeso = 0;
        for (let i = campo.length - 1; i >= 0; i--) {
            prod = peso[indPeso] * parseInt(campo.charAt(i));
            soma += prod;
            indPeso++;
            if (indPeso >= peso.length) indPeso = 0;
        }
        let resto = soma % 11;
        let dv;
        if (resto === 0 || resto === 1) {
            dv = 0;
        } else {
            dv = 11 - resto;
        }
        return dv;
    }

}

module.exports = BoletoArrecadacao;
