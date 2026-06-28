export const locationsCreateWorkflow = {
  module: "master-data/locations",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/locations record ${recordId}`;
  },
};
