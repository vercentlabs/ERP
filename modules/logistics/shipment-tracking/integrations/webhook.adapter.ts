export const shipmentTrackingWebhookAdapter = {
  name: "logistics/shipment-tracking.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/shipment-tracking",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
