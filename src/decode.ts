import { encodeSymbols } from "./encode.ts";

/**
 * Decode Clockwork Base32.
 *
 * @throws {RangeError} If byteOffset is invalid or the buffer is not long enough.
 * @throws {SyntaxError} If input contains invalid symbols.
 *
 * @see https://gist.github.com/szktty/228f85794e4187882a77734c89c384a8
 */
export const decode = <TArrayBuffer extends ArrayBufferLike = ArrayBuffer>(
  string: string,
  buffer?: TArrayBuffer,
  byteOffset?: number,
): Uint8Array<TArrayBuffer> => {
  const length = string.length * (5 / 8);
  const u8array = buffer == null
    ? new Uint8Array(length) as Uint8Array<TArrayBuffer>
    : new Uint8Array(buffer, byteOffset, length);

  let index = 0;

  let state = 0;
  let offset = 0;

  for (let i = 0; i < string.length; i++) {
    const u5 = decodeSymbolMap[string.charCodeAt(i)];
    if (u5 === undefined || u5 === 0xff) {
      throw new SyntaxError(`Invalid symbol: "${string[i]}"`);
    }

    offset += 5;
    state = (state << 5) | u5;

    if (offset >= 8) {
      offset -= 8;
      u8array[index++] = state >> offset;
    }
  }

  return u8array;
};

const decodeSymbolMap = new Uint8Array(0x80).fill(0xff);

decodeSymbolMap[0x4F] = decodeSymbolMap[0x6F] = 0; // O
decodeSymbolMap[0x49] = decodeSymbolMap[0x69] = 1; // I
decodeSymbolMap[0x4C] = decodeSymbolMap[0x6C] = 1; // L

for (let i = 0; i < encodeSymbols.length; i++) {
  const code = encodeSymbols[i]!.charCodeAt(0);
  decodeSymbolMap[code] = i;
  // is upper alphabet
  if (0x40 < code) {
    // to lower alphabet
    decodeSymbolMap[code + 0x20] = i;
  }
}
