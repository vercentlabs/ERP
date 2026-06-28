export const accountingPeriodsSubmitWorkflow = {
  module: "finance/accounting-periods",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/accounting-periods record ${recordId}`;
  },
};
