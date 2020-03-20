# Base64k

[![npm version](https://img.shields.io/badge/npm-1.0.1-blue.svg)](https://www.npmjs.com/package/base64k) 
[![build status](https://api.travis-ci.com/herudi/base64k.svg?branch=master)](https://travis-ci.com/github/herudi/base64k)

Base64 encode decode with key in pure javascript/typescript.

## Motivation

Many developers want to encode and decode base64 with privacy and don't want others to know of the many online base64 encode decoded tools.

## Features

- Encode decode with key.
- Dynamic Encode decode.
- Normal Encode decode (without key).
- Generate string random (bonus).

## Installation

Using npm:

```bash
$ npm install base64k
```

Using yarn:

```bash
$ yarn add base64k
```

## Usage

1. initialize base64k

```JavaScript

//es6 or ts
import base64k from "base64k";

//require
var base64k = require("base64k");

//browser
<script type="text/javascript" src="path/to/dist/base64k.min.js"></script>

```


2. Encode and decode with key.

```JavaScript
...

const text = "mysimpletest";
const key = "mykey";

const encode = base64k.encode(text, key);
console.log(encode);
//console.log : AAAYDBQdFQ4RHB4N

const decode = base64k.decode(encode, key);
console.log(decode);
//console.log : mysimpletest

...

```

3. Dynamic encode and decode (generate random encode with the same string after decode.)

```JavaScript
...

const text = "mysimpletest%&example";

const dyn_encode_1 = base64k.dynEncode(text);
const dyn_decode_1 = base64k.dynDecode(dyn_encode_1);
console.log(dyn_encode_1, " => ", dyn_decode_1);
//console.log : KSglDxc4Iw01Hzclc0AfMC4FMRYh@DQVfzHOhAz  =>  mysimpletest%&example

const dyn_encode_2 = base64k.dynEncode(text);
const dyn_decode_2 = base64k.dynDecode(dyn_encode_2);
console.log(dyn_encode_2, " => ", dyn_decode_2);
//console.log : ITc7AQsXNgIdDz86bU4DHzsKGQYp@LNHhfgZgij  =>  mysimpletest%&example

const dyn_encode_3 = base64k.dynEncode(text);
const dyn_decode_3 = base64k.dynDecode(dyn_encode_3);
console.log(dyn_encode_3, " => ", dyn_decode_3);
//console.log : GgkAADsgCDYAPAQEVk8zKAU+BDUS@wpsiVPdStY  =>  mysimpletest%&example

...
```

4. Normal encode and decode base64 (without key).

```JavaScript
...

const text = "mysimpletest";

const encode = base64k.encode(text);
console.log(encode);
//console.log : bXlzaW1wbGV0ZXN0

const decode = base64k.decode(encode);
console.log(decode);
//console.log : mysimpletest

...
```

5. Generate random string key (bonus).

```JavaScript
...
//random string with combination abjad and number.
const test1 = base64k.genKey(); 
//console.log : LKgX4JRN4G

//random string with length 20 and combination abjad and number.
const test2 = base64k.genKey(20); 
//console.log : A5upjvtz40jv71CIBNDw

//random string with length 20 and only abjad.
const test3 = base64k.genKey(20, "a"); 
//console.log : VsjnmnmimWYZgeohNKAa

//random string with length 20 and only number.
const test4 = base64k.genKey(20, "n"); 
//console.log : 36380839173686148035

...
```

## License

[MIT](LICENSE)

