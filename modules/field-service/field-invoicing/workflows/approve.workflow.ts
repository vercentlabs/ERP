export const fieldInvoicingApproveWorkflow = {
  module: "field-service/field-invoicing",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for field-service/field-invoicing record ${recordId}`;
  },
};
