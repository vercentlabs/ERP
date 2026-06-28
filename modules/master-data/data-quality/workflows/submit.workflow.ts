export const dataQualitySubmitWorkflow = {
  module: "master-data/data-quality",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/data-quality record ${recordId}`;
  },
};
