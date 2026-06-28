export const settingsSubmitWorkflow = {
  module: "platform/settings",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/settings record ${recordId}`;
  },
};
