export const shipmentsCancelWorkflow = {
  module: "logistics/shipments",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for logistics/shipments record ${recordId}`;
  },
};
