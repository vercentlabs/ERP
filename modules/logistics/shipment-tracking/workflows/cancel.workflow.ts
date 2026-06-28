export const shipmentTrackingCancelWorkflow = {
  module: "logistics/shipment-tracking",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for logistics/shipment-tracking record ${recordId}`;
  },
};
