export const chartOfAccountsCancelWorkflow = {
  module: "finance/chart-of-accounts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/chart-of-accounts record ${recordId}`;
  },
};
