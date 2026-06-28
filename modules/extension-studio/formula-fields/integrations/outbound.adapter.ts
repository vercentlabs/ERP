export const formulaFieldsOutboundAdapter = {
  name: "extension-studio/formula-fields.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/formula-fields",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
