import { BASE64_CHAR } from "./constant";

function keyCharAt(key:string, x: number): any {
    return key.charCodeAt(Math.floor(x % key.length));
}

function keyEncode(data: string | any[], key: string): any {
    let res = []
    for (let i = 0; i < data.length; i++) {
        let c = data[i]
        res.push(c.charCodeAt(0) ^ keyCharAt(key, i))
    }
    return res;
}
  
function keyDecode(data: string | any[], key: string): any {
    let res = []
    for (let i = 0; i < data.length; i++) {
        let c = data[i]
        res.push(String.fromCharCode(c ^ keyCharAt(key, i)))
    }             
    return res.join("");            
}

function encrypt(data: any) {
    if (!data) { return data; }
    let o1: number,
        o2: number, 
        o3: number, 
        h1: number, 
        h2: number, 
        h3: number, 
        h4: number, 
        bits: number, 
        r: number, 
        i: number = 0, 
        enc: string = "";
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

function decrypt(data: any) {
    let o1: number, 
        o2: number, 
        o3: number, 
        h1: number, 
        h2: number, 
        h3: number, 
        h4: number, 
        bits: number, 
        i: number = 0, 
        result: any = [];
    if (!data) { return data; }
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
};

export default {
    keyEncode,
    keyDecode,
    encrypt,
    decrypt
}

