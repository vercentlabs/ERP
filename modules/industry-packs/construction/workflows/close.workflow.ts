export const constructionCloseWorkflow = {
  module: "industry-packs/construction",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/construction record ${recordId}`;
  },
};
