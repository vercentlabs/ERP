export const customersCloseWorkflow = {
  module: "master-data/customers",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/customers record ${recordId}`;
  },
};
