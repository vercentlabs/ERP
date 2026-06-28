export const customer360CreateWorkflow = {
  module: "crm/customer-360",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for crm/customer-360 record ${recordId}`;
  },
};
