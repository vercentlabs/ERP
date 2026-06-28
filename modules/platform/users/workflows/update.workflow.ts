export const usersUpdateWorkflow = {
  module: "platform/users",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/users record ${recordId}`;
  },
};
