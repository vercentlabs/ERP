export const fiscalYearsSubmitWorkflow = {
  module: "finance/fiscal-years",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/fiscal-years record ${recordId}`;
  },
};
