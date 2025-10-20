export type VariableCollectionMode = {
  modeId: string;
  name: string;
};

export type VariableValue =
  | string
  | number
  | boolean
  | {
      r: number;
      g: number;
      b: number;
      a: number;
    };

export type Variable = {
  id: string;
  name: string;
  // https://developers.figma.com/docs/plugins/api/VariableResolvedDataType/
  resolvedType: "BOOLEAN" | "COLOR" | "FLOAT" | "STRING";
  scope: string;
  description: string;
  valuesByMode: Record<
    string,
    | VariableValue
    | {
        type: "VARIABLE_ALIAS";
        id: string;
        name: string;
      }
  >;
};

export type VariableCollection = {
  id: string;
  name: string;
  modes: VariableCollectionMode[];
  variables: Variable[];
};

export type ParsedVariables = ReturnType<typeof parse>;

export function parse(data: VariableCollection[], modeName = "Default") {
  const variablesById = new Map<string, Variable>();
  const variableToCollection = new Map<Variable, VariableCollection>();
  const modesById = new Map<string, VariableCollectionMode>();
  const collectionToMode = new Map<
    VariableCollection,
    VariableCollectionMode
  >();

  for (const collection of data) {
    const mode = collection.modes.find((m) => m.name === modeName);
    if (!mode) {
      console.warn(
        `Warning: Collection "${collection.name}" has no mode "${modeName}", skipping.`
      );
      continue;
    }

    collectionToMode.set(collection, mode);
    for (const variable of collection.variables) {
      variableToCollection.set(variable, collection);
      variablesById.set(variable.id, variable);
    }
  }

  const result = new Map<
    string,
    { variable: Variable; resolvedValue: VariableValue }
  >();

  for (const variable of variablesById.values()) {
    const collection = variableToCollection.get(variable);
    const mode = collectionToMode.get(collection!)!;

    const name = variable.name;
    let value = variable.valuesByMode[mode.modeId];

    while (
      typeof value === "object" &&
      "type" in value &&
      value.type === "VARIABLE_ALIAS"
    ) {
      const referencedVariable = variablesById.get(value.id);

      if (!referencedVariable) {
        throw new Error(`Referenced variable with id "${value.id}" not found`);
      }

      const collection = variableToCollection.get(referencedVariable);
      const mode = collectionToMode.get(collection!)!;
      value = referencedVariable.valuesByMode[mode.modeId];
    }

    if (value === undefined) {
      console.log({ mode, variable });
      console.warn(
        `Warning: Variable "${name}" has no value for mode "${modeName}", skipping.`
      );
      continue;
    }

    if (
      typeof value !== "string" &&
      typeof value !== "number" &&
      (typeof value !== "object" || !("r" in value))
    ) {
      throw new Error(
        `Value for variable "${name}" in mode "${modeName}" is not a string, number or {r,g,b,a} object.`
      );
    }

    if (result.has(name)) {
      throw new Error(`Duplicate variable name "${name}"`);
    }

    result.set(name, {
      variable,
      resolvedValue: value,
    });
  }

  return result;
}
