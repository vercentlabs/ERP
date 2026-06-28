export const ticketsUpdateWorkflow = {
  module: "helpdesk/tickets",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for helpdesk/tickets record ${recordId}`;
  },
};
