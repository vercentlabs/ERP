export const entitlementsInboundAdapter = {
  name: "helpdesk/entitlements.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/entitlements",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
