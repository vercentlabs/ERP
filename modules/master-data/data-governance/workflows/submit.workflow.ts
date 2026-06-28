export const dataGovernanceSubmitWorkflow = {
  module: "master-data/data-governance",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/data-governance record ${recordId}`;
  },
};
