export const mobileScanningOutboundAdapter = {
  name: "warehouse/mobile-scanning.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/mobile-scanning",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
