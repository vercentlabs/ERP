export const escalationsApproveWorkflow = {
  module: "helpdesk/escalations",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for helpdesk/escalations record ${recordId}`;
  },
};
