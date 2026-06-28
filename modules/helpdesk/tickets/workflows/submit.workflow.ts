export const ticketsSubmitWorkflow = {
  module: "helpdesk/tickets",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for helpdesk/tickets record ${recordId}`;
  },
};
