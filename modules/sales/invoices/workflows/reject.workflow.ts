export const invoicesRejectWorkflow = {
  module: "sales/invoices",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sales/invoices record ${recordId}`;
  },
};
