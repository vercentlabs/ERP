export const contractsApproveWorkflow = {
  module: "subscriptions/contracts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for subscriptions/contracts record ${recordId}`;
  },
};
