export const supplierQuotationsCloseWorkflow = {
  module: "procurement/supplier-quotations",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/supplier-quotations record ${recordId}`;
  },
};
