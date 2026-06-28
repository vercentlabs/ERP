export const teamsCreateWorkflow = {
  module: "platform/teams",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/teams record ${recordId}`;
  },
};
