export const eventStreamsCreateWorkflow = {
  module: "data-platform/event-streams",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for data-platform/event-streams record ${recordId}`;
  },
};
