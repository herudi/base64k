export declare function genKey(len?: number, an?: string): string;
export declare function encode(data: string, key?: string): string;
export declare function decode(data: any, key?: any): any;
export declare function dynEncode(data: string, key?: string): string;
export declare function dynDecode(data: string): string;
declare const base64k: {
    encode: typeof encode;
    decode: typeof decode;
    dynEncode: typeof dynEncode;
    dynDecode: typeof dynDecode;
    genKey: typeof genKey;
};
export default base64k;
