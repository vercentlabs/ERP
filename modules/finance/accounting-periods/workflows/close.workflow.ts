export const accountingPeriodsCloseWorkflow = {
  module: "finance/accounting-periods",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/accounting-periods record ${recordId}`;
  },
};
