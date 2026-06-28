export const healthcareCreateWorkflow = {
  module: "industry-packs/healthcare",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/healthcare record ${recordId}`;
  },
};
