export const constructionRejectWorkflow = {
  module: "industry-packs/construction",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/construction record ${recordId}`;
  },
};
