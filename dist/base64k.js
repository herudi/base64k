var base64k = (function (exports) {
    'use strict';

    var BASE64_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    function keyCharAt(key, x) {
        return key.charCodeAt(Math.floor(x % key.length));
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
            enc += BASE64_CHAR.charAt(h1) + BASE64_CHAR.charAt(h2) + BASE64_CHAR.charAt(h3) + BASE64_CHAR.charAt(h4);
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
            h1 = BASE64_CHAR.indexOf(data.charAt(i++));
            h2 = BASE64_CHAR.indexOf(data.charAt(i++));
            h3 = BASE64_CHAR.indexOf(data.charAt(i++));
            h4 = BASE64_CHAR.indexOf(data.charAt(i++));
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
    var func = {
        keyEncode: keyEncode,
        keyDecode: keyDecode,
        encrypt: encrypt,
        decrypt: decrypt
    };

    var utf8_encode = function (str) {
        str = str.replace(/\r\n/g, "n");
        var t = "";
        for (var n = 0; n < str.length; n++) {
            var r = str.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
            }
            else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128);
            }
            else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128);
            }
        }
        return t;
    };
    var utf8_decode = function (str) {
        var t = "";
        var n = 0;
        var r, c3, c2 = 0;
        while (n < str.length) {
            r = str.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++;
            }
            else if (r > 191 && r < 224) {
                c2 = str.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2;
            }
            else {
                c2 = str.charCodeAt(n + 1);
                c3 = str.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3;
            }
        }
        return t;
    };
    var encode = function (str) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        str = utf8_encode(str);
        while (f < str.length) {
            n = str.charCodeAt(f++);
            r = str.charCodeAt(f++);
            i = str.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64;
            }
            else if (isNaN(i)) {
                a = 64;
            }
            t = t + BASE64_CHAR.charAt(s) + BASE64_CHAR.charAt(o) + BASE64_CHAR.charAt(u) + BASE64_CHAR.charAt(a);
        }
        return t;
    };
    var decode = function (str) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        str = str.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < str.length) {
            s = BASE64_CHAR.indexOf(str.charAt(f++));
            o = BASE64_CHAR.indexOf(str.charAt(f++));
            u = BASE64_CHAR.indexOf(str.charAt(f++));
            a = BASE64_CHAR.indexOf(str.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r);
            }
            if (a != 64) {
                t = t + String.fromCharCode(i);
            }
        }
        t = utf8_decode(t);
        return t;
    };
    var base64 = {
        encode: encode,
        decode: decode
    };

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
    function encode$1(data, key) {
        if (key) {
            return func.encrypt(func.keyEncode(data, key));
        }
        return base64.encode(data);
    }
    function decode$1(data, key) {
        if (key) {
            return func.keyDecode(func.decrypt(data), key);
        }
        return base64.decode(data);
    }
    function dynEncode(data, key) {
        if (!key) {
            key = genKey(10, 'a');
        }
        var result = encode$1(data, key) + "@" + key;
        return result;
    }
    function dynDecode(data) {
        var _data = data.split("@");
        if (_data.length != 2) {
            return "";
        }
        return decode$1(_data[0], _data[1]);
    }

    exports.BASE64_CHAR = BASE64_CHAR;
    exports.decode = decode$1;
    exports.dynDecode = dynDecode;
    exports.dynEncode = dynEncode;
    exports.encode = encode$1;
    exports.genKey = genKey;

    return exports;

}({}));
