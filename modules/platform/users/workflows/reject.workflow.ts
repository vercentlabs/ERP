export const usersRejectWorkflow = {
  module: "platform/users",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/users record ${recordId}`;
  },
};
