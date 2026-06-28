export const nonprofitRejectWorkflow = {
  module: "industry-packs/nonprofit",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/nonprofit record ${recordId}`;
  },
};
