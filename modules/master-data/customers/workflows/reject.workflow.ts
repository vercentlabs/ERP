export const customersRejectWorkflow = {
  module: "master-data/customers",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/customers record ${recordId}`;
  },
};
