export const landedCostsCreateWorkflow = {
  module: "procurement/landed-costs",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/landed-costs record ${recordId}`;
  },
};
