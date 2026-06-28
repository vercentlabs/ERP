export const shipmentTrackingInboundAdapter = {
  name: "logistics/shipment-tracking.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/shipment-tracking",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
