export const uomMasterCancelWorkflow = {
  module: "master-data/uom-master",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/uom-master record ${recordId}`;
  },
};
