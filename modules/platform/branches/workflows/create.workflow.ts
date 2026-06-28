export const branchesCreateWorkflow = {
  module: "platform/branches",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/branches record ${recordId}`;
  },
};
