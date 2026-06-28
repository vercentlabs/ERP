export const customersCreateWorkflow = {
  module: "crm/customers",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for crm/customers record ${recordId}`;
  },
};
