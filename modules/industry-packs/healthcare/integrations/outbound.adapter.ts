export const healthcareOutboundAdapter = {
  name: "industry-packs/healthcare.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/healthcare",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
