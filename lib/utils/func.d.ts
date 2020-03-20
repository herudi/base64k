declare function keyEncode(data: string | any[], key: string): any;
declare function keyDecode(data: string | any[], key: string): any;
declare function encrypt(data: any): any;
declare function decrypt(data: any): any;
declare const _default: {
    keyEncode: typeof keyEncode;
    keyDecode: typeof keyDecode;
    encrypt: typeof encrypt;
    decrypt: typeof decrypt;
};
export default _default;
