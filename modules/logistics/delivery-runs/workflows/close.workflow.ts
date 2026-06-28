export const deliveryRunsCloseWorkflow = {
  module: "logistics/delivery-runs",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for logistics/delivery-runs record ${recordId}`;
  },
};
