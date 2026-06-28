export const supplierPortalRejectWorkflow = {
  module: "procurement/supplier-portal",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/supplier-portal record ${recordId}`;
  },
};
