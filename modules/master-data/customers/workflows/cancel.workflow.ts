export const customersCancelWorkflow = {
  module: "master-data/customers",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/customers record ${recordId}`;
  },
};
