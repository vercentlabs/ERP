export const shipmentTrackingUpdateWorkflow = {
  module: "logistics/shipment-tracking",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for logistics/shipment-tracking record ${recordId}`;
  },
};
