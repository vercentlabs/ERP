export const dataLakeCreateWorkflow = {
  module: "data-platform/data-lake",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for data-platform/data-lake record ${recordId}`;
  },
};
