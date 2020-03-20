"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
function keyCharAt(key, x) {
    return key.charCodeAt(Math.floor(x % key.length));
}
function genKey(len, an) {
    if (!len) {
        len = 10;
    }
    an = an && an.toLowerCase();
    var str = "", i = 0, min = an == "a" ? 10 : 0, max = an == "n" ? 10 : 62;
    for (; i++ < len;) {
        var r = Math.random() * (max - min) + min << 0;
        str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
    }
    return str;
}
function keyEncode(data, key) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var c = data[i];
        res.push(c.charCodeAt(0) ^ keyCharAt(key, i));
    }
    return res;
}
function keyDecode(data, key) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var c = data[i];
        res.push(String.fromCharCode(c ^ keyCharAt(key, i)));
    }
    return res.join("");
}
function encrypt(data) {
    if (!data) {
        return data;
    }
    var o1, o2, o3, h1, h2, h3, h4, bits, r, i = 0, enc = "";
    do {
        o1 = data[i++];
        o2 = data[i++];
        o3 = data[i++];
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        enc += constant_1.BASE64_CHAR.charAt(h1) + constant_1.BASE64_CHAR.charAt(h2) + constant_1.BASE64_CHAR.charAt(h3) + constant_1.BASE64_CHAR.charAt(h4);
    } while (i < data.length);
    r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
}
function decrypt(data) {
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, result = [];
    if (!data) {
        return data;
    }
    data += "";
    do {
        h1 = constant_1.BASE64_CHAR.indexOf(data.charAt(i++));
        h2 = constant_1.BASE64_CHAR.indexOf(data.charAt(i++));
        h3 = constant_1.BASE64_CHAR.indexOf(data.charAt(i++));
        h4 = constant_1.BASE64_CHAR.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        result.push(o1);
        if (h3 !== 64) {
            result.push(o2);
            if (h4 !== 64) {
                result.push(o3);
            }
        }
    } while (i < data.length);
    return result;
}
;
exports.default = {
    genKey: genKey,
    keyEncode: keyEncode,
    keyDecode: keyDecode,
    encrypt: encrypt,
    decrypt: decrypt
};
