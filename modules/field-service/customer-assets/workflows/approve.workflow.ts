export const customerAssetsApproveWorkflow = {
  module: "field-service/customer-assets",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for field-service/customer-assets record ${recordId}`;
  },
};
