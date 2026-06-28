export const apparelUpdateWorkflow = {
  module: "industry-packs/apparel",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/apparel record ${recordId}`;
  },
};
