export const catalogCancelWorkflow = {
  module: "commerce/catalog",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for commerce/catalog record ${recordId}`;
  },
};
