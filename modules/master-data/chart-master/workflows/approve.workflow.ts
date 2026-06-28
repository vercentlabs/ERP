export const chartMasterApproveWorkflow = {
  module: "master-data/chart-master",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/chart-master record ${recordId}`;
  },
};
