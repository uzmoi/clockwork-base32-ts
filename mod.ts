/**
 * Encode Clockwork Base32.
 *
 * @see https://gist.github.com/szktty/228f85794e4187882a77734c89c384a8
 */
export const encode = (u8array: Uint8Array): string => {
  let string = "";

  let state = 0;
  let offset = 0;

  for (let i = 0; i < u8array.length; i++) {
    state = (state << 8) | u8array[i]!;
    offset += 8 - 5;
    string += encodeSymbols[(state >> offset) & 0b11111];

    if (offset > 5) {
      offset -= 5;
      string += encodeSymbols[(state >> offset) & 0b11111];
    }
  }

  if (offset > 0) {
    string += encodeSymbols[(state << (5 - offset)) & 0b11111];
  }

  return string;
};

/**
 * Decode Clockwork Base32.
 *
 * @throws {RangeError} If input contains invalid symbols.
 *
 * @see https://gist.github.com/szktty/228f85794e4187882a77734c89c384a8
 */
export const decode = (string: string): Uint8Array => {
  const u8array = new Uint8Array(string.length * (5 / 8));

  let index = 0;

  let state = 0;
  let offset = 0;

  for (let i = 0; i < string.length; i++) {
    const u5 = decodeSymbolMap[string.charCodeAt(i)];
    if (u5 === undefined || u5 === 0xff) {
      throw new RangeError(`Invalid symbol: "${string[i]}"`);
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

// deno-fmt-ignore
const encodeSymbols = [
  "0", "1", "2", "3", "4", "5", "6", "7",
  "8", "9", "A", "B", "C", "D", "E", "F",
  "G", "H", "J", "K", "M", "N", "P", "Q",
  "R", "S", "T", "V", "W", "X", "Y", "Z",
] as const;

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
