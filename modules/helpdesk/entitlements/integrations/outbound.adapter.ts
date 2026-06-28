export const entitlementsOutboundAdapter = {
  name: "helpdesk/entitlements.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/entitlements",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
