export const dataQualityInboundAdapter = {
  name: "master-data/data-quality.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/data-quality",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
