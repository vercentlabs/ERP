export const chartMasterCreateWorkflow = {
  module: "master-data/chart-master",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/chart-master record ${recordId}`;
  },
};
