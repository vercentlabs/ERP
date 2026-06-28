export const commissionsApproveWorkflow = {
  module: "sales/commissions",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sales/commissions record ${recordId}`;
  },
};
