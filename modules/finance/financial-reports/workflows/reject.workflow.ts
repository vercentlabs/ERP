export const financialReportsRejectWorkflow = {
  module: "finance/financial-reports",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/financial-reports record ${recordId}`;
  },
};
