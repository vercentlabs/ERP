export const preventiveMaintenanceOutboundAdapter = {
  name: "maintenance/preventive-maintenance.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/preventive-maintenance",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
