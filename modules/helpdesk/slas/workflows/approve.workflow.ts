export const slasApproveWorkflow = {
  module: "helpdesk/slas",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for helpdesk/slas record ${recordId}`;
  },
};
