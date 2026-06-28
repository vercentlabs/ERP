export const fieldInvoicingSubmitWorkflow = {
  module: "field-service/field-invoicing",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for field-service/field-invoicing record ${recordId}`;
  },
};
