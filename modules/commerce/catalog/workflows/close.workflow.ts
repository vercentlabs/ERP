export const catalogCloseWorkflow = {
  module: "commerce/catalog",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for commerce/catalog record ${recordId}`;
  },
};
