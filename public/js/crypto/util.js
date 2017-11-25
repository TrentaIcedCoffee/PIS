// TODO -> strict

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

var jwtOf = function(...args) {
    // make header, payload and secret
    var header = '{"typ": "JWT", "alg": "HS256"}';
    var payload = undefined;
    var secret = undefined;
    if (args.length == 1) {
        var user = args[0];
        payload = `{email: ${user.email}}`;
        secret = user._id;
    } else if (args.length == 2) {
        payload = args[0];
        secret = args[1];
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
}

// get email value in jwt string
var getEmailInJwt = function(jwt) {
    var jwtPayloadStr = getBase64Decoded((jwt.split('.'))[1].toString());
    var email = undefined;
    for (var i = 0; i < jwtPayloadStr.length; i++) {
        // start with 'email'
        if (jwtPayloadStr.substring(i, i + 5) == 'email') {
            for (var j = i; j < jwtPayloadStr.length; j++) {
                // value btn ""
                if (jwtPayloadStr.charAt(j) == '"') {
                    for (k = j + 1; k < jwtPayloadStr.length; k++) {
                        if (jwtPayloadStr.charAt(k) == '"') {
                            email = jwtPayloadStr.substring(j + 1, k);
                        }
                    }
                }
            }
        }
    }
    return email;
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
