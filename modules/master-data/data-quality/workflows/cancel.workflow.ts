export const dataQualityCancelWorkflow = {
  module: "master-data/data-quality",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/data-quality record ${recordId}`;
  },
};
