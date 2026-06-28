export const fiscalYearsCreateWorkflow = {
  module: "finance/fiscal-years",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/fiscal-years record ${recordId}`;
  },
};
