# clockwork-base32

[![NPM Version][npm-badge]](https://www.npmjs.com/package/@uzmoi/clockwork-base32)
[![JSR Version][jsr-badge]](https://jsr.io/@uzmoi/clockwork-base32)
[![License][license-badge]](https://opensource.org/license/MIT)
[![npm bundle size][bundle-size-badge]](https://bundlephobia.com/package/@uzmoi/clockwork-base32)

[npm-badge]: https://img.shields.io/npm/v/@uzmoi/clockwork-base32?style=flat-square&logo=npm
[jsr-badge]: https://img.shields.io/jsr/v/@uzmoi/clockwork-base32?style=flat-square&logo=jsr
[license-badge]: https://img.shields.io/github/license/uzmoi/clockwork-base32-ts?style=flat-square
[bundle-size-badge]: https://img.shields.io/bundlephobia/min/@uzmoi/clockwork-base32?style=flat-square

A fast and minimal implementation of
[Clockwork Base32](https://gist.github.com/szktty/228f85794e4187882a77734c89c384a8)
for TypeScript.

## Install

```sh
npm install @uzmoi/clockwork-base32
# or
deno add jsr:@uzmoi/clockwork-base32
```

## Usage

```ts
import * as base32 from "@uzmoi/clockwork-base32";

const array = Uint8Array.from("Hello, world!", (c) => c.charCodeAt(0));

base32.encode(array); // => "91JPRV3F5GG7EVVJDHJ22"

base32.decode("91JPRV3F5GG7EVVJDHJ22"); // => Same as `array`
```
