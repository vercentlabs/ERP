export const accountingPeriodsCreateWorkflow = {
  module: "finance/accounting-periods",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/accounting-periods record ${recordId}`;
  },
};
