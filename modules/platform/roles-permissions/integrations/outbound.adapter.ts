export const rolesPermissionsOutboundAdapter = {
  name: "platform/roles-permissions.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/roles-permissions",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
