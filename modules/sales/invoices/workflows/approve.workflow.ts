export const invoicesApproveWorkflow = {
  module: "sales/invoices",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sales/invoices record ${recordId}`;
  },
};
