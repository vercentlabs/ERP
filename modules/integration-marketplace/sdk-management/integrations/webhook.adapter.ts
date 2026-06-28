export const sdkManagementWebhookAdapter = {
  name: "integration-marketplace/sdk-management.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/sdk-management",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
