const Boleto = require('./boleto');

class BoletoArrecadacao extends Boleto {

    constructor(linhaDigitavel) {
        super(linhaDigitavel);
    }

}

module.exports = BoletoArrecadacao;
