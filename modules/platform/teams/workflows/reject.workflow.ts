export const teamsRejectWorkflow = {
  module: "platform/teams",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/teams record ${recordId}`;
  },
};
