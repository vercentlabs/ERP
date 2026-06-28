export const dispatchInboundAdapter = {
  name: "field-service/dispatch.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/dispatch",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
