export const fiscalYearsRejectWorkflow = {
  module: "finance/fiscal-years",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/fiscal-years record ${recordId}`;
  },
};
