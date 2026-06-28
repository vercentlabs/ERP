export const goodsReceiptsInboundAdapter = {
  name: "procurement/goods-receipts.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/goods-receipts",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
