export const validationRulesOutboundAdapter = {
  name: "extension-studio/validation-rules.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/validation-rules",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
