export const constructionUpdateWorkflow = {
  module: "industry-packs/construction",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/construction record ${recordId}`;
  },
};
