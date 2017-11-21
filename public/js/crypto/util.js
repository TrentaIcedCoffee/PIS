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
