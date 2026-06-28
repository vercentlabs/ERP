export const eventStreamsCloseWorkflow = {
  module: "data-platform/event-streams",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for data-platform/event-streams record ${recordId}`;
  },
};
