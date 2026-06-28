export const supplierQuotationsUpdateWorkflow = {
  module: "procurement/supplier-quotations",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/supplier-quotations record ${recordId}`;
  },
};
