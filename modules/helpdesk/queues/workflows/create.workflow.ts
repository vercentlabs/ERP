export const queuesCreateWorkflow = {
  module: "helpdesk/queues",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for helpdesk/queues record ${recordId}`;
  },
};
