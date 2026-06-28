export const consentManagementOutboundAdapter = {
  name: "compliance/consent-management.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/consent-management",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
