export const financialReportsSubmitWorkflow = {
  module: "finance/financial-reports",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/financial-reports record ${recordId}`;
  },
};
