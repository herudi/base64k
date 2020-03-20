import { expect } from 'chai';
import base64k from '../src/index';

let eq = (a: string, b: string) => {
    return () => {
        expect(a).equal(b);
    }
}

describe("encode_without_key", () => {
    it("herudi => aGVydWRp", eq(base64k.encode("herudi"),"aGVydWRp"));
    it("adf => YWRm", eq(base64k.encode("adf"),"YWRm"));
    it("678&sshttp => Njc4JnNzaHR0cA==", eq(base64k.encode("678&sshttp"),"Njc4JnNzaHR0cA=="));
    it("https://github.com/ => aHR0cHM6Ly9naXRodWIuY29tLw==", eq(base64k.encode("https://github.com/"),"aHR0cHM6Ly9naXRodWIuY29tLw=="));
    it("###$jah => IyMjJGphaA==", eq(base64k.encode("###$jah"),"IyMjJGphaA=="));
});

describe("decode_without_key", () => {
    it("aGVydWRp => herudi", eq(base64k.decode("aGVydWRp"),"herudi"));
    it("YWRm => adf", eq(base64k.decode("YWRm"),"adf"));
    it("Njc4JnNzaHR0cA== => 678&sshttp", eq(base64k.decode("Njc4JnNzaHR0cA=="),"678&sshttp"));
    it("aHR0cHM6Ly9naXRodWIuY29tLw== => https://github.com/", eq(base64k.decode("aHR0cHM6Ly9naXRodWIuY29tLw=="),"https://github.com/"));
    it("IyMjJGphaA== => ###$jah", eq(base64k.decode("IyMjJGphaA=="),"###$jah"));
});

describe("encode_with_key (12Jkl3qwe)", () => {
    let samplekey = "12Jkl3qwe";
    it("herudi => WVc4Hgha", eq(base64k.encode("herudi", samplekey),"WVc4Hgha"));
    it("adf => UFYs", eq(base64k.encode("adf", samplekey),"UFYs"));
    it("678&sshttp => BwVyTR9AGQMRQQ==", eq(base64k.encode("678&sshttp", samplekey),"BwVyTR9AGQMRQQ=="));
    it("https://github.com/ => WUY+Gx8JXlgCWEYiHg4dEhgIHg==", eq(base64k.encode("https://github.com/", samplekey),"WUY+Gx8JXlgCWEYiHg4dEhgIHg=="));
    it("###$jah => EhFpTwZSGQ==", eq(base64k.encode("###$jah", samplekey),"EhFpTwZSGQ=="));
});

describe("decode_with_key (12Jkl3qwe)", () => {
    let samplekey = "12Jkl3qwe";
    it("WVc4Hgha => herudi", eq(base64k.decode("WVc4Hgha", samplekey),"herudi"));
    it("UFYs => adf", eq(base64k.decode("UFYs", samplekey),"adf"));
    it("BwVyTR9AGQMRQQ== => 678&sshttp", eq(base64k.decode("BwVyTR9AGQMRQQ==", samplekey),"678&sshttp"));
    it("WUY+Gx8JXlgCWEYiHg4dEhgIHg== => https://github.com/", eq(base64k.decode("WUY+Gx8JXlgCWEYiHg4dEhgIHg==", samplekey),"https://github.com/"));
    it("EhFpTwZSGQ== => ###$jah", eq(base64k.decode("EhFpTwZSGQ==", samplekey),"###$jah"));
});

describe("dynamic_encode_decode_(random encode and decode is same text)", () => {
    let sample_a_1 = base64k.dynEncode("https://github.com");
    let sample_a_2 = base64k.dynEncode("https://github.com");
    let sample_a_3 = base64k.dynEncode("https://github.com");
    
    it(sample_a_1+" => https://github.com", eq(base64k.dynDecode(sample_a_1), "https://github.com"));
    it(sample_a_2+" => https://github.com", eq(base64k.dynDecode(sample_a_2), "https://github.com"));
    it(sample_a_3+" => https://github.com", eq(base64k.dynDecode(sample_a_3), "https://github.com"));
});