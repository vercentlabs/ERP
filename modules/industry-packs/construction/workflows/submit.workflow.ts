export const constructionSubmitWorkflow = {
  module: "industry-packs/construction",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/construction record ${recordId}`;
  },
};
