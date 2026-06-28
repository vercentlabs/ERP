export const queuesCancelWorkflow = {
  module: "helpdesk/queues",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for helpdesk/queues record ${recordId}`;
  },
};
