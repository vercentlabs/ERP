export const nonprofitUpdateWorkflow = {
  module: "industry-packs/nonprofit",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/nonprofit record ${recordId}`;
  },
};
