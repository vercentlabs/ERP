export const invoicesCreateWorkflow = {
  module: "sales/invoices",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sales/invoices record ${recordId}`;
  },
};
