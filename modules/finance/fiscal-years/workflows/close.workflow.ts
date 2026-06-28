export const fiscalYearsCloseWorkflow = {
  module: "finance/fiscal-years",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/fiscal-years record ${recordId}`;
  },
};
