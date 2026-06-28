export const dataGovernanceApproveWorkflow = {
  module: "master-data/data-governance",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/data-governance record ${recordId}`;
  },
};
