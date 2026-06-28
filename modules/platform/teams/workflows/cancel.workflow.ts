export const teamsCancelWorkflow = {
  module: "platform/teams",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/teams record ${recordId}`;
  },
};
