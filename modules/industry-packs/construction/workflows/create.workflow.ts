export const constructionCreateWorkflow = {
  module: "industry-packs/construction",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/construction record ${recordId}`;
  },
};
