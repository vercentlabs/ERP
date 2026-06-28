export const catalogApproveWorkflow = {
  module: "commerce/catalog",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for commerce/catalog record ${recordId}`;
  },
};
