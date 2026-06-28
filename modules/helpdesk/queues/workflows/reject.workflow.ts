export const queuesRejectWorkflow = {
  module: "helpdesk/queues",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for helpdesk/queues record ${recordId}`;
  },
};
