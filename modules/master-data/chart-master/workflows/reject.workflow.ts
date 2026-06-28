export const chartMasterRejectWorkflow = {
  module: "master-data/chart-master",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/chart-master record ${recordId}`;
  },
};
