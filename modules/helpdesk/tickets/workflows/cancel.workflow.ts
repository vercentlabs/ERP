export const ticketsCancelWorkflow = {
  module: "helpdesk/tickets",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for helpdesk/tickets record ${recordId}`;
  },
};
