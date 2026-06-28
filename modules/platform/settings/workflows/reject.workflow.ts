export const settingsRejectWorkflow = {
  module: "platform/settings",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/settings record ${recordId}`;
  },
};
