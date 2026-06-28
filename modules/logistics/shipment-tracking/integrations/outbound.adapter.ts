export const shipmentTrackingOutboundAdapter = {
  name: "logistics/shipment-tracking.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/shipment-tracking",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
