export const nonprofitApproveWorkflow = {
  module: "industry-packs/nonprofit",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/nonprofit record ${recordId}`;
  },
};
