export const customersCreateWorkflow = {
  module: "master-data/customers",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/customers record ${recordId}`;
  },
};
