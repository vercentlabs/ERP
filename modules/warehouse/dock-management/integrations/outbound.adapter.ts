export const dockManagementOutboundAdapter = {
  name: "warehouse/dock-management.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/dock-management",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
