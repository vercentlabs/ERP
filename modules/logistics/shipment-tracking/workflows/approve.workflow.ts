export const shipmentTrackingApproveWorkflow = {
  module: "logistics/shipment-tracking",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for logistics/shipment-tracking record ${recordId}`;
  },
};
