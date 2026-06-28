export const invoicesCloseWorkflow = {
  module: "sales/invoices",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sales/invoices record ${recordId}`;
  },
};
