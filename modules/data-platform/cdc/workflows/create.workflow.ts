export const cdcCreateWorkflow = {
  module: "data-platform/cdc",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for data-platform/cdc record ${recordId}`;
  },
};
