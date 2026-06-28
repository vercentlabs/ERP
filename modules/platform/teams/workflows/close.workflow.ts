export const teamsCloseWorkflow = {
  module: "platform/teams",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/teams record ${recordId}`;
  },
};
