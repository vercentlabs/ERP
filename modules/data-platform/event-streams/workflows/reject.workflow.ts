export const eventStreamsRejectWorkflow = {
  module: "data-platform/event-streams",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for data-platform/event-streams record ${recordId}`;
  },
};
