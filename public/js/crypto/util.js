// utils for CryptoJS
var getBase64Encoded = function(rawStr) {
    var wordArray = CryptoJS.enc.Utf8.parse(rawStr);
    var result = CryptoJS.enc.Base64.stringify(wordArray);
    return result;
};

var getBase64Decoded = function(encStr) {
    var wordArray = CryptoJS.enc.Base64.parse(encStr);
    var result = wordArray.toString(CryptoJS.enc.Utf8);
    return result;
};

var getJwt = function(header, payload, secret) {
    var headerBase64 = getBase64Encoded(header);
    var payloadBase64 = getBase64Encoded(payload);
    var signature = CryptoJS.HmacSHA256(headerBase64 + '.' + payloadBase64, secret);
    var signatureBase64 = CryptoJS.enc.Base64.stringify(signature);
    var jwt = headerBase64 + '.' + payloadBase64 + '.' + signatureBase64;
    return jwt;
}

var isValidJwt = function(thatJwt, secret) {
    if (typeof thatJwt != 'string') {
        return false;
    }
    var thatJwtArray = thatJwt.split('.');
    if (thatJwtArray.length != 3) {
        return false;
    }
    var headerBase64 = thatJwtArray[0].toString();
    var payloadBase64 = thatJwtArray[1].toString();
    var signature = CryptoJS.HmacSHA256(headerBase64 + '.' + payloadBase64, secret);
    var signatureBase64 = CryptoJS.enc.Base64.stringify(signature);
    var thisJwt = headerBase64 + '.' + payloadBase64 + '.' + signatureBase64;
    return thatJwt == thisJwt;
};
