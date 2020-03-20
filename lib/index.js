"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var func_1 = require("./utils/func");
var base64_1 = require("./libext/base64");
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
exports.genKey = genKey;
function encode(data, key) {
    if (key) {
        return func_1.default.encrypt(func_1.default.keyEncode(data, key));
    }
    return base64_1.default.b64encode(data);
}
exports.encode = encode;
function decode(data, key) {
    if (key) {
        return func_1.default.keyDecode(func_1.default.decrypt(data), key);
    }
    return base64_1.default.b64decode(data);
}
exports.decode = decode;
function dynEncode(data, key) {
    if (!key) {
        key = genKey(10, 'a');
    }
    var result = encode(data, key) + "@" + key;
    return result;
}
exports.dynEncode = dynEncode;
function dynDecode(data) {
    var _data = data.split("@");
    if (_data.length != 2) {
        return "";
    }
    return decode(_data[0], _data[1]);
}
exports.dynDecode = dynDecode;
var base64k = {
    encode: encode,
    decode: decode,
    dynEncode: dynEncode,
    dynDecode: dynDecode,
    genKey: genKey
};
exports.default = base64k;
