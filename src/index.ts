import func from "./utils/func";
import base64 from "./libext/base64";

export function genKey(len?: number, an?: string): string {
    if (!len) {len=10}
    an = an && an.toLowerCase();
    let str = "",
        i = 0,
        min = an == "a" ? 10 : 0,
        max = an == "n" ? 10 : 62;
    for (; i++ < len;) {
      let r = Math.random() * (max - min) + min << 0;
      str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
    }
    return str;
}

export function encode(data: string, key?: string): string {
    if (key) {return func.encrypt(func.keyEncode(data, key));}
    return base64.b64encode(data);
}

export function decode(data: string, key?: string): string {
    if (key) {return func.keyDecode(func.decrypt(data), key);}
    return base64.b64decode(data);
}

export function dynEncode(data: string, key?: string): string {
    if (!key) {
        key=genKey(10,'a')
    }
    let result = encode(data, key)+"@"+key;
    return result;
}

export function dynDecode(data: string): string {
    let _data: string[] = data.split("@");
    if (_data.length != 2) {
        return "";
    }
    return decode(_data[0], _data[1]);
}

const base64k = {
    encode,
    decode,
    dynEncode,
    dynDecode,
    genKey
};

export default base64k;
