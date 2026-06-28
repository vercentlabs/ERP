export const catalogUpdateWorkflow = {
  module: "commerce/catalog",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for commerce/catalog record ${recordId}`;
  },
};
