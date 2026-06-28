export const taxMasterRejectWorkflow = {
  module: "master-data/tax-master",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/tax-master record ${recordId}`;
  },
};
