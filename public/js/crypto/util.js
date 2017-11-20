// utils for CryptoJS
var getBase64Encoded = function(rawStr) {
    var wordArray = CryptoJS.enc.Utf8.parse(rawStr);
    var result = CryptoJS.enc.Base64.stringify(wordArray);
    reture result;
};

var getBase64Decoded = function(encStr) {
    var wordArray = CryptoJS.enc.Base64.parse(encStr);
    var result = wordArray.toString(CryptoJS.enc.Utf8);
    return result;
};
