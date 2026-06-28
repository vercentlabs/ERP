export const deliveryRunsApproveWorkflow = {
  module: "logistics/delivery-runs",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for logistics/delivery-runs record ${recordId}`;
  },
};
