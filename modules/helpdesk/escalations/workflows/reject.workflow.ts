export const escalationsRejectWorkflow = {
  module: "helpdesk/escalations",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for helpdesk/escalations record ${recordId}`;
  },
};
