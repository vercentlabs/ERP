export const customFieldsOutboundAdapter = {
  name: "extension-studio/custom-fields.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/custom-fields",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
