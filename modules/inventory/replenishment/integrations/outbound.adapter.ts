export const replenishmentOutboundAdapter = {
  name: "inventory/replenishment.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/replenishment",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
