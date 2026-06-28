export const supplierQuotationsRejectWorkflow = {
  module: "procurement/supplier-quotations",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/supplier-quotations record ${recordId}`;
  },
};
