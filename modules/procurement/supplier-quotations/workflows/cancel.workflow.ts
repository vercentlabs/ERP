export const supplierQuotationsCancelWorkflow = {
  module: "procurement/supplier-quotations",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/supplier-quotations record ${recordId}`;
  },
};
