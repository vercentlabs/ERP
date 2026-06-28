export const dataGovernanceCreateWorkflow = {
  module: "master-data/data-governance",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/data-governance record ${recordId}`;
  },
};
