export const accountingPeriodsUpdateWorkflow = {
  module: "finance/accounting-periods",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/accounting-periods record ${recordId}`;
  },
};
