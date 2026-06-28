export const dispatchOutboundAdapter = {
  name: "field-service/dispatch.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/dispatch",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
