export const taxMasterUpdateWorkflow = {
  module: "master-data/tax-master",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/tax-master record ${recordId}`;
  },
};
