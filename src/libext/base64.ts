import { BASE64_CHAR } from "../utils/constant";

const utf8_encode = (str: string) => {
    str = str.replace(/\r\n/g, "n");
    let t = "";
    for (let n = 0; n < str.length; n++) {
        let r = str.charCodeAt(n);
        if (r < 128) {
            t += String.fromCharCode(r)
        } else if (r > 127 && r < 2048) {
            t += String.fromCharCode(r >> 6 | 192);
            t += String.fromCharCode(r & 63 | 128)
        } else {
            t += String.fromCharCode(r >> 12 | 224);
            t += String.fromCharCode(r >> 6 & 63 | 128);
            t += String.fromCharCode(r & 63 | 128)
        }
    }
    return t
};

const utf8_decode = (str: string) => {
    let t = "";
    let n = 0;
    let r: number, 
        c3: number, 
        c2 = 0;
    while (n < str.length) {
        r = str.charCodeAt(n);
        if (r < 128) {
            t += String.fromCharCode(r);
            n++
        } else if (r > 191 && r < 224) {
            c2 = str.charCodeAt(n + 1);
            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
            n += 2
        } else {
            c2 = str.charCodeAt(n + 1);
            c3 = str.charCodeAt(n + 2);
            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            n += 3
        }
    }
    return t
}

const b64encode = (str: string) => {
    let t = "";
    let n: number, r: number, i: number, s: number, o: number, u: number, a: number;
    let f = 0;
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
            u = a = 64
        } else if (isNaN(i)) {
            a = 64
        }
        t = t + BASE64_CHAR.charAt(s) + BASE64_CHAR.charAt(o) + BASE64_CHAR.charAt(u) + BASE64_CHAR.charAt(a)
    }
    return t;
}

const b64decode = (str: string) => {
    let t = "";
    let n: number, r: number, i: number;
    let s: number, o: number, u: number, a: number;
    let f = 0;
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
            t = t + String.fromCharCode(r)
        }
        if (a != 64) {
            t = t + String.fromCharCode(i)
        }
    }
    t = utf8_decode(t);
    return t
};

const base64 = {
    b64encode,
    b64decode
}

export default base64;