export const partiesCloseWorkflow = {
  module: "master-data/parties",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/parties record ${recordId}`;
  },
};
