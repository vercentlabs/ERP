export const uomMasterRejectWorkflow = {
  module: "master-data/uom-master",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/uom-master record ${recordId}`;
  },
};
