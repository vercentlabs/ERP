export const deliveryRunsCancelWorkflow = {
  module: "logistics/delivery-runs",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for logistics/delivery-runs record ${recordId}`;
  },
};
