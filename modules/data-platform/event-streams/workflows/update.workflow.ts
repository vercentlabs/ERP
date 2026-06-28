export const eventStreamsUpdateWorkflow = {
  module: "data-platform/event-streams",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for data-platform/event-streams record ${recordId}`;
  },
};
