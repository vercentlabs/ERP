export const queuesUpdateWorkflow = {
  module: "helpdesk/queues",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for helpdesk/queues record ${recordId}`;
  },
};
