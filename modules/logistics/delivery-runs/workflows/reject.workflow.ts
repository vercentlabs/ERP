export const deliveryRunsRejectWorkflow = {
  module: "logistics/delivery-runs",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for logistics/delivery-runs record ${recordId}`;
  },
};
