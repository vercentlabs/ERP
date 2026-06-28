export const queuesCloseWorkflow = {
  module: "helpdesk/queues",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for helpdesk/queues record ${recordId}`;
  },
};
