export const goodsReceiptsOutboundAdapter = {
  name: "procurement/goods-receipts.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/goods-receipts",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
