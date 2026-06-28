export const ticketsCloseWorkflow = {
  module: "helpdesk/tickets",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for helpdesk/tickets record ${recordId}`;
  },
};
