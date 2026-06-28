export const deliveryRunsUpdateWorkflow = {
  module: "logistics/delivery-runs",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for logistics/delivery-runs record ${recordId}`;
  },
};
