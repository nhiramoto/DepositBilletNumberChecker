const Boleto = require('./boleto');

class BoletoArrecadacao extends Boleto {

    constructor(linhaDigitavel) {
        super(linhaDigitavel);
    }

    get campo1() {
        return this._linhaDigitavel.substring(0, 11);
    }

    get dvCampo1() {
        return this._linhaDigitavel.charAt(11);
    }

    get campo2() {
        return this._linhaDigitavel.substring(12, 23);
    }

    get dvCampo2() {
        return this._linhaDigitavel.charAt(23);
    }

    get campo3() {
        return this._linhaDigitavel.substring(24, 35);
    }

    get dvCampo3() {
        return this._linhaDigitavel.charAt(35);
    }

    get campo4() {
        return this._linhaDigitavel.substring(36, 47);
    }

    get dvCampo4() {
        return this._linhaDigitavel.charAt(47);
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

    /**
     * Verifica se o boleto é válido.
     */
    get ehValido() {
        if (!this.estruturaValida()) {
            this._valido = false;
        } else if (this.dvCampo1 != BoletoArrecadacao.digitoVerifMod10(this.campo1)
                && this.dvCampo1 != BoletoArrecadacao.digitoVerifMod11(this.campo1)) {
            this._valido = false;
        } else if (this.dvCampo2 != BoletoArrecadacao.digitoVerifMod10(this.campo2)
                && this.dvCampo2 != BoletoArrecadacao.digitoVerifMod11(this.campo2)) {
            this._valido = false;
        } else if (this.dvCampo3 != BoletoArrecadacao.digitoVerifMod10(this.campo3)
                && this.dvCampo3 != BoletoArrecadacao.digitoVerifMod11(this.campo3)) {
            this._valido = false;
        } else if (this.dvCampo4 != BoletoArrecadacao.digitoVerifMod10(this.campo4)
                && this.dvCampo4 != BoletoArrecadacao.digitoVerifMod11(this.campo4)) {
            this._valido = false;
        } else {
            let campos = this.campo1.substring(0, 3) + this.campo1.substring(4)
                + this.campo2 + this.campo3 + this.campo4;
            let dv = this._linhaDigitavel.charAt(3);
            if (dv != BoletoArrecadacao.digitoVerifMod10(campos)
                    && dv != BoletoArrecadacao.digitoVerifMod11(campos)) {
                this._valido = false;
            } else {
                this._valido = true;
            }
        }
        return this._valido;
    }

    get valor() {
        if (this._valido) {
            let campoValor = this.campo1.substring(4) + this.campo2.substring(0, 4);
            return parseFloat(campoValor) / 100;
        } else {
            return null;
        }
    }

    get vencimento() {
        if (this._valido) {
            let campoAno = this.campo2.substring(8) + this.campo3.substring(0, 1);
            let campoMes = this.campo3.substring(1, 3);
            let campoDia = this.campo3.substring(3, 5);
            return new Date(`${campoAno}-${campoMes}-${campoDia}`);
        } else {
            return null;
        }
    }

}

module.exports = BoletoArrecadacao;
