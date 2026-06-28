export const profitabilityCreateWorkflow = {
  module: "projects/profitability",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for projects/profitability record ${recordId}`;
  },
};
