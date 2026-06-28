export const catalogRejectWorkflow = {
  module: "commerce/catalog",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for commerce/catalog record ${recordId}`;
  },
};
