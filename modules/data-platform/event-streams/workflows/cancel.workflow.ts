export const eventStreamsCancelWorkflow = {
  module: "data-platform/event-streams",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for data-platform/event-streams record ${recordId}`;
  },
};
