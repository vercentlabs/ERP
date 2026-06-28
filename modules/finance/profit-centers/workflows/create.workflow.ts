export const profitCentersCreateWorkflow = {
  module: "finance/profit-centers",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/profit-centers record ${recordId}`;
  },
};
