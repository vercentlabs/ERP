export const chartMasterUpdateWorkflow = {
  module: "master-data/chart-master",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/chart-master record ${recordId}`;
  },
};
