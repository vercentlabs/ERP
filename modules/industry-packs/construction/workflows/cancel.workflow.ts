export const constructionCancelWorkflow = {
  module: "industry-packs/construction",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/construction record ${recordId}`;
  },
};
