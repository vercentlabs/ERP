export const customerAssetsRejectWorkflow = {
  module: "field-service/customer-assets",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for field-service/customer-assets record ${recordId}`;
  },
};
