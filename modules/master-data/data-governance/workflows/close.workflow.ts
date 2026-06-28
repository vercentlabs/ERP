export const dataGovernanceCloseWorkflow = {
  module: "master-data/data-governance",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/data-governance record ${recordId}`;
  },
};
