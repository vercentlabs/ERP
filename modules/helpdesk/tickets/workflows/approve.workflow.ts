export const ticketsApproveWorkflow = {
  module: "helpdesk/tickets",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for helpdesk/tickets record ${recordId}`;
  },
};
