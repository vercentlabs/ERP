export const shipmentTrackingSubmitWorkflow = {
  module: "logistics/shipment-tracking",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for logistics/shipment-tracking record ${recordId}`;
  },
};
