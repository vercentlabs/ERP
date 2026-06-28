export const fiscalYearsUpdateWorkflow = {
  module: "finance/fiscal-years",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/fiscal-years record ${recordId}`;
  },
};
