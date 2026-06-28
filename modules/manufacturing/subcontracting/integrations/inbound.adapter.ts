export const subcontractingInboundAdapter = {
  name: "manufacturing/subcontracting.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/subcontracting",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
