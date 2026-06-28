export const customersApproveWorkflow = {
  module: "master-data/customers",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/customers record ${recordId}`;
  },
};
