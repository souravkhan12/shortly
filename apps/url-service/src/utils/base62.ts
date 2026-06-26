export class Base62Encoder {
  private static readonly ALPHABET =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  private static readonly BASE = Base62Encoder.ALPHABET.length;

  static encode(value: number): string | undefined {
    if (value < 0) {
      throw new Error("Value must be a positive integer.");
    }

    if (value === 0) {
      return Base62Encoder.ALPHABET[0];
    }

    let encoded = "";

    while (value > 0) {
      encoded = Base62Encoder.ALPHABET[value % Base62Encoder.BASE] + encoded;

      value = Math.floor(value / Base62Encoder.BASE);
    }

    return encoded;
  }

  static decode(value: string): number {
    let decoded = 0;

    for (const char of value) {
      const index = Base62Encoder.ALPHABET.indexOf(char);

      if (index === -1) {
        throw new Error(`Invalid Base62 character: ${char}`);
      }

      decoded = decoded * Base62Encoder.BASE + index;
    }

    return decoded;
  }
}
