export const eventStreamsSubmitWorkflow = {
  module: "data-platform/event-streams",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for data-platform/event-streams record ${recordId}`;
  },
};
