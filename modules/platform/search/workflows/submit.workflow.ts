export const searchSubmitWorkflow = {
  module: "platform/search",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/search record ${recordId}`;
  },
};
