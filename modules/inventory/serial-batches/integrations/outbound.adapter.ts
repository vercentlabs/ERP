export const serialBatchesOutboundAdapter = {
  name: "inventory/serial-batches.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/serial-batches",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
