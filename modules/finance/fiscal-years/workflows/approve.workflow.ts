export const fiscalYearsApproveWorkflow = {
  module: "finance/fiscal-years",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/fiscal-years record ${recordId}`;
  },
};
