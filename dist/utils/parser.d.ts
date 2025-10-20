export type VariableCollectionMode = {
    modeId: string;
    name: string;
};
export type VariableValue = string | number | boolean | {
    r: number;
    g: number;
    b: number;
    a: number;
};
export type Variable = {
    id: string;
    name: string;
    resolvedType: "BOOLEAN" | "COLOR" | "FLOAT" | "STRING";
    scope: string;
    description: string;
    valuesByMode: Record<string, VariableValue | {
        type: "VARIABLE_ALIAS";
        id: string;
        name: string;
    }>;
};
export type VariableCollection = {
    id: string;
    name: string;
    modes: VariableCollectionMode[];
    variables: Variable[];
};
export type ParsedVariables = ReturnType<typeof parse>;
export declare function parse(data: VariableCollection[], modeName?: string): Map<string, {
    variable: Variable;
    resolvedValue: VariableValue;
}>;
//# sourceMappingURL=parser.d.ts.map