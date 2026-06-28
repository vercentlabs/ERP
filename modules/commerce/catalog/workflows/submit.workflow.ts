export const catalogSubmitWorkflow = {
  module: "commerce/catalog",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for commerce/catalog record ${recordId}`;
  },
};
