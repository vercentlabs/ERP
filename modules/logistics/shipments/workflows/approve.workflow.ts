export const shipmentsApproveWorkflow = {
  module: "logistics/shipments",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for logistics/shipments record ${recordId}`;
  },
};
