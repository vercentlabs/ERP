export const catalogCreateWorkflow = {
  module: "commerce/catalog",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for commerce/catalog record ${recordId}`;
  },
};
