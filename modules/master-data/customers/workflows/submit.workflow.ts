export const customersSubmitWorkflow = {
  module: "master-data/customers",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/customers record ${recordId}`;
  },
};
