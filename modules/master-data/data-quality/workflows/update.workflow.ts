export const dataQualityUpdateWorkflow = {
  module: "master-data/data-quality",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/data-quality record ${recordId}`;
  },
};
