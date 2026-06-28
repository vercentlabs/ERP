export const nonprofitCancelWorkflow = {
  module: "industry-packs/nonprofit",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/nonprofit record ${recordId}`;
  },
};
