export const escalationsCloseWorkflow = {
  module: "helpdesk/escalations",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for helpdesk/escalations record ${recordId}`;
  },
};
