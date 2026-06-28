export const chartMasterSubmitWorkflow = {
  module: "master-data/chart-master",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/chart-master record ${recordId}`;
  },
};
