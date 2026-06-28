export const invoicesSubmitWorkflow = {
  module: "sales/invoices",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sales/invoices record ${recordId}`;
  },
};
