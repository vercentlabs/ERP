export const usersCreateWorkflow = {
  module: "platform/users",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/users record ${recordId}`;
  },
};
