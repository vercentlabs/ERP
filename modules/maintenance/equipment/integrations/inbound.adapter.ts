export const equipmentInboundAdapter = {
  name: "maintenance/equipment.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/equipment",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
