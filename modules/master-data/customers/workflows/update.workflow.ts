export const customersUpdateWorkflow = {
  module: "master-data/customers",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/customers record ${recordId}`;
  },
};
