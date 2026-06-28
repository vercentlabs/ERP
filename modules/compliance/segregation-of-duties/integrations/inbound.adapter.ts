export const segregationOfDutiesInboundAdapter = {
  name: "compliance/segregation-of-duties.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/segregation-of-duties",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
