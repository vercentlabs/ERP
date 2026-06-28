export const dataQualityApproveWorkflow = {
  module: "master-data/data-quality",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/data-quality record ${recordId}`;
  },
};
