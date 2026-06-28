export const fieldInvoicingCreateWorkflow = {
  module: "field-service/field-invoicing",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for field-service/field-invoicing record ${recordId}`;
  },
};
