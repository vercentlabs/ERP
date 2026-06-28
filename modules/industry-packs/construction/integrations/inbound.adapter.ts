export const constructionInboundAdapter = {
  name: "industry-packs/construction.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/construction",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
