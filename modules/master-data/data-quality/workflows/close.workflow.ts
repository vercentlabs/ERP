export const dataQualityCloseWorkflow = {
  module: "master-data/data-quality",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/data-quality record ${recordId}`;
  },
};
