export const escalationsCreateWorkflow = {
  module: "helpdesk/escalations",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for helpdesk/escalations record ${recordId}`;
  },
};
