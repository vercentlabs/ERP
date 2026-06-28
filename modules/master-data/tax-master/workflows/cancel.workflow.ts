export const taxMasterCancelWorkflow = {
  module: "master-data/tax-master",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/tax-master record ${recordId}`;
  },
};
