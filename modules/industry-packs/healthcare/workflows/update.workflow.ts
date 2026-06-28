export const healthcareUpdateWorkflow = {
  module: "industry-packs/healthcare",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/healthcare record ${recordId}`;
  },
};
