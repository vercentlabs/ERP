export const invoicesCancelWorkflow = {
  module: "sales/invoices",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sales/invoices record ${recordId}`;
  },
};
