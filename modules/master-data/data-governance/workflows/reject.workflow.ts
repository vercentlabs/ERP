export const dataGovernanceRejectWorkflow = {
  module: "master-data/data-governance",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/data-governance record ${recordId}`;
  },
};
