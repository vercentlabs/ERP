export const shipmentTrackingCloseWorkflow = {
  module: "logistics/shipment-tracking",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for logistics/shipment-tracking record ${recordId}`;
  },
};
