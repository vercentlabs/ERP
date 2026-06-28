export const fiscalYearsCancelWorkflow = {
  module: "finance/fiscal-years",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/fiscal-years record ${recordId}`;
  },
};
