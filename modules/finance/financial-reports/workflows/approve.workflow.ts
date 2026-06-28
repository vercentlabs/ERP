export const financialReportsApproveWorkflow = {
  module: "finance/financial-reports",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/financial-reports record ${recordId}`;
  },
};
