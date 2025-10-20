export declare class Token<V> {
    readonly value: V;
    constructor(value: V);
    toString(): string;
    valueOf(): V;
}
export declare class NumberToken<T extends number> extends Token<T> {
    get px(): string;
}
export declare class StringToken<T extends string> extends Token<T> {
}
export declare class ColorToken<R extends number, G extends number, B extends number, A extends number> extends Token<[R, G, B, A]> {
    get r(): R;
    get g(): G;
    get b(): B;
    get a(): A;
    toString(): `rgba(${R}, ${G}, ${B}, ${A})`;
}
export declare class BooleanToken<T extends boolean> extends Token<T> {
}
//# sourceMappingURL=header.d.ts.map