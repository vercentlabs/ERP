export const mobileScanningInboundAdapter = {
  name: "warehouse/mobile-scanning.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/mobile-scanning",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
