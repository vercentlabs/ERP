export const supplierPortalSubmitWorkflow = {
  module: "procurement/supplier-portal",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/supplier-portal record ${recordId}`;
  },
};
