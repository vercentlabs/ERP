export const fieldInvoicingCloseWorkflow = {
  module: "field-service/field-invoicing",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for field-service/field-invoicing record ${recordId}`;
  },
};
