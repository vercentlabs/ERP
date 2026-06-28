export const shipmentTrackingCreateWorkflow = {
  module: "logistics/shipment-tracking",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for logistics/shipment-tracking record ${recordId}`;
  },
};
