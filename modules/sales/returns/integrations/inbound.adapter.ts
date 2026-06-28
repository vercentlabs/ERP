export const returnsInboundAdapter = {
  name: "sales/returns.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sales/returns",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
