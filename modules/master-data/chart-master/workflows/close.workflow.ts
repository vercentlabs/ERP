export const chartMasterCloseWorkflow = {
  module: "master-data/chart-master",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/chart-master record ${recordId}`;
  },
};
