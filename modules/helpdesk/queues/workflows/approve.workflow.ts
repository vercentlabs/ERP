export const queuesApproveWorkflow = {
  module: "helpdesk/queues",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for helpdesk/queues record ${recordId}`;
  },
};
