const Boleto = require('./boleto');

class BoletoBancario extends Boleto {

    constructor(linhaDigitavel) {
        super(linhaDigitavel);
    }

}

module.exports = BoletoBancario;
