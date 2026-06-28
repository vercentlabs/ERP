export const ticketsCreateWorkflow = {
  module: "helpdesk/tickets",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for helpdesk/tickets record ${recordId}`;
  },
};
