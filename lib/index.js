import func from "./utils/func";
import base64 from "./libext/base64";
export function genKey(len, an) {
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
export function encode(data, key) {
    if (key) {
        return func.encrypt(func.keyEncode(data, key));
    }
    return base64.encode(data);
}
export function decode(data, key) {
    if (key) {
        return func.keyDecode(func.decrypt(data), key);
    }
    return base64.decode(data);
}
export function dynEncode(data, key) {
    if (!key) {
        key = genKey(10, 'a');
    }
    var result = encode(data, key) + "@" + key;
    return result;
}
export function dynDecode(data) {
    var _data = data.split("@");
    if (_data.length != 2) {
        return "";
    }
    return decode(_data[0], _data[1]);
}
var base64k = {
    encode: encode,
    decode: decode,
    dynEncode: dynEncode,
    dynDecode: dynDecode,
    genKey: genKey
};
export default base64k;
