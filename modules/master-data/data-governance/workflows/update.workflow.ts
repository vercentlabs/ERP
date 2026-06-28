export const dataGovernanceUpdateWorkflow = {
  module: "master-data/data-governance",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/data-governance record ${recordId}`;
  },
};
