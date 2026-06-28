export const sdkManagementOutboundAdapter = {
  name: "integration-marketplace/sdk-management.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/sdk-management",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
