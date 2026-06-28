export const fieldInvoicingCancelWorkflow = {
  module: "field-service/field-invoicing",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for field-service/field-invoicing record ${recordId}`;
  },
};
