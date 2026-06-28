export const quotationsCancelWorkflow = {
  module: "sales/quotations",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sales/quotations record ${recordId}`;
  },
};
