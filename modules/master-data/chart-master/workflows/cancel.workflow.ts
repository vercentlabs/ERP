export const chartMasterCancelWorkflow = {
  module: "master-data/chart-master",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/chart-master record ${recordId}`;
  },
};
