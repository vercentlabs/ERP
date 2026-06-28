export const shipmentTrackingRejectWorkflow = {
  module: "logistics/shipment-tracking",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for logistics/shipment-tracking record ${recordId}`;
  },
};
