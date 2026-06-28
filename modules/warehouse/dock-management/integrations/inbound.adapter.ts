export const dockManagementInboundAdapter = {
  name: "warehouse/dock-management.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/dock-management",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
