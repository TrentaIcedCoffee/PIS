// TODO -> strict
// utils for CryptoJS

var jwtInCookie = function(cookie) {
    if (!cookie || typeof cookie != 'string') {
        return undefined;
    }
    var cookieArr = cookie.split(';').map(function(val) {
        return val.trim();
    });
    var jwtRedundant = cookieArr.filter(function(val) {
        return val.length > 4 && val.substring(0, 4) == 'usr=';
    })[0];

    return jwtRedundant ? jwtRedundant.substring(4) : undefined;
};
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
/*
    jwtOf(user)
    jwtOf(email, _id, password)
*/
var jwtOf = function(...args) {
    // make header, payload and secret
    var header = '{"typ": "JWT", "alg": "HS256"}';
    var payload = undefined;
    var secret = undefined;
    if (args.length == 1) {
        var user = args[0];
        payload = `{"email": "${user.email}", "_id": "${user._id}"}`;
        secret = user.password;
    } else if (args.length == 3) {
        var email = args[0];
        var _id = args[1];
        var password = args[2];
        payload = `{"email": "${email}", "_id": "${_id}"}`;
        secret = password;
    } else {
        throw new DebugException();
    }
    // make jwt
    var headerBase64 = getBase64Encoded(header);
    var payloadBase64 = getBase64Encoded(payload);
    var signature = CryptoJS.HmacSHA256(headerBase64 + '.' + payloadBase64, secret);
    var signatureBase64 = CryptoJS.enc.Base64.stringify(signature);
    var jwt = headerBase64 + '.' + payloadBase64 + '.' + signatureBase64;
    return jwt;
};
// get email value in jwt string
var getEmailInJwt = function(jwt) {
    var payload = getBase64Decoded((jwt.split('.'))[1].toString());
    var payloadObj = JSON.parse(payload);
    return payloadObj.email;
};
// get _id value in jwt string
var getIdInJwt = function(jwt) {
    var payload = getBase64Decoded((jwt.split('.'))[1].toString());
    var payloadObj = JSON.parse(payload);
    return payloadObj._id;
};
// TODO -> strict
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
