export const scrapReworkOutboundAdapter = {
  name: "manufacturing/scrap-rework.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/scrap-rework",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
