import { assertEquals, assertThrows } from "@std/assert";
import { describe, test } from "@std/testing/bdd";
import { decode, encode } from "./src/index.ts";

const cases = [
  ["", ""],
  ["f", "CR"],
  ["foobar", "CSQPYRK1E8"],
  ["Hello, world!", "91JPRV3F5GG7EVVJDHJ22"],
  [
    "The quick brown fox jumps over the lazy dog.",
    "AHM6A83HENMP6TS0C9S6YXVE41K6YY10D9TPTW3K41QQCSBJ41T6GS90DHGQMY90CHQPEBG",
  ],
] as const;

describe("encode", () => {
  for (const [rawString, encoded] of cases) {
    const raw = Uint8Array.from(rawString, (c) => c.charCodeAt(0));

    test(`encode(${rawString})`, () => {
      assertEquals(encode(raw), encoded);
    });
  }
});

describe("decode", () => {
  for (const [rawString, encoded] of cases) {
    const raw = Uint8Array.from(rawString, (c) => c.charCodeAt(0));

    test(`decode(${encoded})`, () => {
      assertEquals(decode(encoded), raw);
    });

    test(`decode(${encoded.toLowerCase()})`, () => {
      assertEquals(decode(encoded.toLowerCase()), raw);
    });
  }

  test("decode(a)", () => {
    assertEquals(decode("a"), new Uint8Array());
  });

  for (
    const [string, normal] of [
      ["CR0", "CR"],
      ["O0", "00"],
      ["I0", "10"],
      ["L0", "10"],
    ] as const
  ) {
    test(`decode(${string})`, () => {
      assertEquals(decode(string), decode(normal));
    });
  }

  describe("error", () => {
    test("decode(U)", () => {
      assertThrows(() => decode("U"), RangeError);
    });

    test("decode(あ)", () => {
      assertThrows(() => decode("あ"), RangeError);
    });
  });
});
