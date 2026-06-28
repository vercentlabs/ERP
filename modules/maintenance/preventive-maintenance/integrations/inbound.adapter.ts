export const preventiveMaintenanceInboundAdapter = {
  name: "maintenance/preventive-maintenance.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/preventive-maintenance",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
