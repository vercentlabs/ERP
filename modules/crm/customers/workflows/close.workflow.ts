export const customersCloseWorkflow = {
  module: "crm/customers",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for crm/customers record ${recordId}`;
  },
};
