export const uomMasterCreateWorkflow = {
  module: "master-data/uom-master",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/uom-master record ${recordId}`;
  },
};
