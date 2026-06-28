export const uomMasterUpdateWorkflow = {
  module: "master-data/uom-master",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/uom-master record ${recordId}`;
  },
};
