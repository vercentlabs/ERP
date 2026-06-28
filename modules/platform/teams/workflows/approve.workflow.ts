export const teamsApproveWorkflow = {
  module: "platform/teams",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/teams record ${recordId}`;
  },
};
