export const accountingPeriodsCancelWorkflow = {
  module: "finance/accounting-periods",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/accounting-periods record ${recordId}`;
  },
};
