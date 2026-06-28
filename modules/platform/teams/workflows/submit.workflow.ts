export const teamsSubmitWorkflow = {
  module: "platform/teams",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/teams record ${recordId}`;
  },
};
