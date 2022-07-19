var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const text_hash = function(txtData){
    ans_hash = bcrypt.hashSync(txtData, salt);
    return ans_hash;
}

const compare_enc_value = function(actualText,encpText){
    return bcrypt.compareSync(actualText, encpText);
}

module.exports = {
    text_hash,compare_enc_value
}