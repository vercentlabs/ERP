export const nonprofitCreateWorkflow = {
  module: "industry-packs/nonprofit",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/nonprofit record ${recordId}`;
  },
};
