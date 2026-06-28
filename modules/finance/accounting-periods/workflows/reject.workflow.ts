export const accountingPeriodsRejectWorkflow = {
  module: "finance/accounting-periods",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/accounting-periods record ${recordId}`;
  },
};
