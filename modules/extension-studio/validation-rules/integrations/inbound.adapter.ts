export const validationRulesInboundAdapter = {
  name: "extension-studio/validation-rules.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/validation-rules",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
