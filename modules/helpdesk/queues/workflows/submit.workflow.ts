export const queuesSubmitWorkflow = {
  module: "helpdesk/queues",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for helpdesk/queues record ${recordId}`;
  },
};
