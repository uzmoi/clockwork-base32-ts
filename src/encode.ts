/**
 * Encode to Clockwork Base32.
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

// cSpell:disable-next-line
export const encodeSymbols = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
