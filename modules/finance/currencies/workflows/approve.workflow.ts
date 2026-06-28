export const currenciesApproveWorkflow = {
  module: "finance/currencies",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/currencies record ${recordId}`;
  },
};
