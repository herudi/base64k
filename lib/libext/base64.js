"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../utils/constant");
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
var b64encode = function (str) {
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
        t = t + constant_1.BASE64_CHAR.charAt(s) + constant_1.BASE64_CHAR.charAt(o) + constant_1.BASE64_CHAR.charAt(u) + constant_1.BASE64_CHAR.charAt(a);
    }
    return t;
};
var b64decode = function (str) {
    var t = "";
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    str = str.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (f < str.length) {
        s = constant_1.BASE64_CHAR.indexOf(str.charAt(f++));
        o = constant_1.BASE64_CHAR.indexOf(str.charAt(f++));
        u = constant_1.BASE64_CHAR.indexOf(str.charAt(f++));
        a = constant_1.BASE64_CHAR.indexOf(str.charAt(f++));
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
    b64encode: b64encode,
    b64decode: b64decode
};
exports.default = base64;
