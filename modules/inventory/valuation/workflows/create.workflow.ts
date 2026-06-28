export const valuationCreateWorkflow = {
  module: "inventory/valuation",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for inventory/valuation record ${recordId}`;
  },
};
