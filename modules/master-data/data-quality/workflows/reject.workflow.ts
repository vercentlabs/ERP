export const dataQualityRejectWorkflow = {
  module: "master-data/data-quality",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/data-quality record ${recordId}`;
  },
};
