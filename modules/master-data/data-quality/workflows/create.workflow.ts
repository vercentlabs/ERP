export const dataQualityCreateWorkflow = {
  module: "master-data/data-quality",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/data-quality record ${recordId}`;
  },
};
