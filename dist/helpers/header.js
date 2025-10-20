// This file is auto-generated. Do not edit directly.
/* eslint-disable @cspell/spellchecker */
export class Token {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return String(this.value);
    }
    valueOf() {
        return this.value;
    }
}
export class NumberToken extends Token {
    get px() {
        return `${this.value}px`;
    }
}
export class StringToken extends Token {
}
export class ColorToken extends Token {
    get r() {
        return this.value[0];
    }
    get g() {
        return this.value[1];
    }
    get b() {
        return this.value[2];
    }
    get a() {
        return this.value[3];
    }
    toString() {
        const [r, g, b, a] = this.value;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
}
export class BooleanToken extends Token {
}
//# sourceMappingURL=header.js.map