export const escalationsCancelWorkflow = {
  module: "helpdesk/escalations",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for helpdesk/escalations record ${recordId}`;
  },
};
