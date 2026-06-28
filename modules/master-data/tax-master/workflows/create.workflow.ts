export const taxMasterCreateWorkflow = {
  module: "master-data/tax-master",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/tax-master record ${recordId}`;
  },
};
