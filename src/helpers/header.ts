// This file is auto-generated. Do not edit directly.
/* eslint-disable @cspell/spellchecker */

export class Token<V> {
  public constructor(public readonly value: V) {}

  toString(): string {
    return String(this.value);
  }

  valueOf(): V {
    return this.value;
  }
}

export class NumberToken<T extends number> extends Token<T> {
  get px(): string {
    return `${this.value}px`;
  }
}

export class StringToken<T extends string> extends Token<T> {}

export class ColorToken<
  R extends number,
  G extends number,
  B extends number,
  A extends number
> extends Token<[R, G, B, A]> {
  get r(): R {
    return this.value[0];
  }

  get g(): G {
    return this.value[1];
  }

  get b(): B {
    return this.value[2];
  }

  get a(): A {
    return this.value[3];
  }

  toString(): `rgba(${R}, ${G}, ${B}, ${A})` {
    const [r, g, b, a] = this.value;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}

export class BooleanToken<T extends boolean> extends Token<T> {}
