export const accountingPeriodsApproveWorkflow = {
  module: "finance/accounting-periods",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/accounting-periods record ${recordId}`;
  },
};
