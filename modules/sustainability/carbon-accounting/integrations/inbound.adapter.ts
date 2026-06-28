export const carbonAccountingInboundAdapter = {
  name: "sustainability/carbon-accounting.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/carbon-accounting",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
