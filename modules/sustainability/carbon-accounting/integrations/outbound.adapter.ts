export const carbonAccountingOutboundAdapter = {
  name: "sustainability/carbon-accounting.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/carbon-accounting",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
