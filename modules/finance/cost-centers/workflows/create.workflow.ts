export const costCentersCreateWorkflow = {
  module: "finance/cost-centers",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/cost-centers record ${recordId}`;
  },
};
