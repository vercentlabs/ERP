export const usersApproveWorkflow = {
  module: "platform/users",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/users record ${recordId}`;
  },
};
