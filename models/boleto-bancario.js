const Boleto = require('./boleto');

class BoletoBancario extends Boleto {

    constructor(linhaDigitavel) {
        super(linhaDigitavel);
    }

    get campo1() {
        return this._linhaDigitavel.substring(0, 9);
    }

    get dvCampo1() {
        return this._linhaDigitavel.charAt(9);
    }

    get campo2() {
        return this._linhaDigitavel.substring(10, 20);
    }

    get dvCampo2() {
        return this._linhaDigitavel.charAt(20);
    }

    get campo3() {
        return this._linhaDigitavel.substring(21, 31);
    }

    get dvCampo3() {
        return this._linhaDigitavel.charAt(31);
    }

    get campo4() {
        return this._linhaDigitavel.charAt(32);
    }

    get campo5() {
        return this._linhaDigitavel.substring(33, 47);
    }

    get vencimento() {
        if (this._valido && this.campo5.charAt(4) == 0) {
            let campoVencimento = this.campo5.substring(0, 4);
            let dataBase = new Date('2000-07-03');
            let milisecDia = 86400000;
            let fator = parseInt(campoVencimento) - 1000;
            let vencimento = new Date(dataBase.getTime() + fator * milisecDia);
            return vencimento;
        } else {
            return null;
        }
    }

    get valor() {
        if (this._valido) {
            let campoValor;
            // Verifica se valor ultrapassa campo vencimento.
            if (this.campo5.charAt(4) == 0) {
                campoValor = this.campo5.substring(4, 14);
            } else {
                // Elimina campo vencimento
                campoValor = this.campo5.substring(0, 14);
            }
            return parseFloat(campoValor) / 100;
        } else {
            return null;
        }
    }

    /**
     * Verifica se o boleto é válido.
     */
    get ehValido() {
        if (this.dvCampo1 != Boleto.digitoVerifMod10(this.campo1)
                && this.dvCampo1 != BoletoBancario.digitoVerifMod11(this.campo1)) {
            this._valido = false;
        } else if (this.dvCampo2 != BoletoBancario.digitoVerifMod10(this.campo2)
                && this.dvCampo2 != BoletoBancario.digitoVerifMod11(this.campo2)) {
            this._valido = false;
        } else if (this.dvCampo3 != BoletoBancario.digitoVerifMod10(this.campo3)
                && this.dvCampo3 != BoletoBancario.digitoVerifMod11(this.campo3)) {
            this._valido = false;
        } else {
            let campos = this._linhaDigitavel.substring(0, 32)
                       + this._linhaDigitavel.substring(33, 47);
            if (this.campo4 != BoletoBancario.digitoVerifMod10(campos)
                    && this.campo4 != BoletoBancario.digitoVerifMod11(campos)) {
                this._valido = false;
            } else {
                this._valido = true;
            }
        }
        return this._valido;
    }

    /**
     * Calcula o valor do dígito verificador usando o módulo 11.
     */
    static digitoVerifMod11(campo) {
        let soma = 0, prod;
        let peso = [2, 3, 4, 5, 6, 7, 8, 9], indPeso = 0;
        for (let i = campo.length - 1; i >= 0; i--) {
            prod = peso[indPeso] * parseInt(campo.charAt(i));
            soma += prod;
            indPeso++;
            if (indPeso >= peso.length) indPeso = 0;
        }
        let dv = 11 - (soma % 11);
        if (dv === 0 || dv === 10 || dv === 11) dv = 1;
        return dv;
    }

}

module.exports = BoletoBancario;
