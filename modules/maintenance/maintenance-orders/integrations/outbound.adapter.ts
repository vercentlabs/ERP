export const maintenanceOrdersOutboundAdapter = {
  name: "maintenance/maintenance-orders.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/maintenance-orders",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
