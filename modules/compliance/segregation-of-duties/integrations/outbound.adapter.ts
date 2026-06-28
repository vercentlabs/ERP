export const segregationOfDutiesOutboundAdapter = {
  name: "compliance/segregation-of-duties.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/segregation-of-duties",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
