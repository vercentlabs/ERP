export const taxMasterCloseWorkflow = {
  module: "master-data/tax-master",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/tax-master record ${recordId}`;
  },
};
