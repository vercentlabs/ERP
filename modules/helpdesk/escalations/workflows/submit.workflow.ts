export const escalationsSubmitWorkflow = {
  module: "helpdesk/escalations",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for helpdesk/escalations record ${recordId}`;
  },
};
