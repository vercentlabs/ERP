export const ticketsRejectWorkflow = {
  module: "helpdesk/tickets",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for helpdesk/tickets record ${recordId}`;
  },
};
