export const eventStreamsApproveWorkflow = {
  module: "data-platform/event-streams",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for data-platform/event-streams record ${recordId}`;
  },
};
