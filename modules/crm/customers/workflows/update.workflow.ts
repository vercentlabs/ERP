export const customersUpdateWorkflow = {
  module: "crm/customers",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for crm/customers record ${recordId}`;
  },
};
