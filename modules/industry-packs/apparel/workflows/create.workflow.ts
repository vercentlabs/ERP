export const apparelCreateWorkflow = {
  module: "industry-packs/apparel",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/apparel record ${recordId}`;
  },
};
