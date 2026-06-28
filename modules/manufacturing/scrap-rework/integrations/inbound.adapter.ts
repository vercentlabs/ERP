export const scrapReworkInboundAdapter = {
  name: "manufacturing/scrap-rework.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/scrap-rework",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
