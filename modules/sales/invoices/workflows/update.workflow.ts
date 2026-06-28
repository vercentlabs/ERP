export const invoicesUpdateWorkflow = {
  module: "sales/invoices",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sales/invoices record ${recordId}`;
  },
};
