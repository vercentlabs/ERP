export const uomMasterCloseWorkflow = {
  module: "master-data/uom-master",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/uom-master record ${recordId}`;
  },
};
