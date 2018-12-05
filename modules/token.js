const crypto = require('crypto');

var token = {};

// helper internal function
token._encrypt = ( data )  => {
    const data_encrypted = crypto.createHmac('sha256', 'some secret').update(data).digest('hex');

    console.log('encrypted str: ' + data_encrypted);
    return data_encrypted;
}

module.exports = token;