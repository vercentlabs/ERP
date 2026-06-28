export const escalationsUpdateWorkflow = {
  module: "helpdesk/escalations",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for helpdesk/escalations record ${recordId}`;
  },
};
