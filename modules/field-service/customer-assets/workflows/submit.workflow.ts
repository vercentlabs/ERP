export const customerAssetsSubmitWorkflow = {
  module: "field-service/customer-assets",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for field-service/customer-assets record ${recordId}`;
  },
};
