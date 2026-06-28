export const fieldInvoicingUpdateWorkflow = {
  module: "field-service/field-invoicing",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for field-service/field-invoicing record ${recordId}`;
  },
};
