export const customFieldsOutboundAdapter = {
  name: "platform/custom-fields.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/custom-fields",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
