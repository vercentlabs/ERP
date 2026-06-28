export const productRevisionsOutboundAdapter = {
  name: "product-lifecycle/product-revisions.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/product-revisions",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
