export const teamsUpdateWorkflow = {
  module: "platform/teams",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/teams record ${recordId}`;
  },
};
