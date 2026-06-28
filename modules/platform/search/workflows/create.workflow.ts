export const searchCreateWorkflow = {
  module: "platform/search",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/search record ${recordId}`;
  },
};
