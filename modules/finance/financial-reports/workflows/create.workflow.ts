export const financialReportsCreateWorkflow = {
  module: "finance/financial-reports",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/financial-reports record ${recordId}`;
  },
};
