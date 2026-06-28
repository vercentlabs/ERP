export const consolidationCreateWorkflow = {
  module: "finance/consolidation",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/consolidation record ${recordId}`;
  },
};
