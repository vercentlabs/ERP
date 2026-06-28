export const fieldInvoicingRejectWorkflow = {
  module: "field-service/field-invoicing",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for field-service/field-invoicing record ${recordId}`;
  },
};
