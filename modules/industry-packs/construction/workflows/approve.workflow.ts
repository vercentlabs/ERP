export const constructionApproveWorkflow = {
  module: "industry-packs/construction",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/construction record ${recordId}`;
  },
};
