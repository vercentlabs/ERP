export const settingsApproveWorkflow = {
  module: "platform/settings",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/settings record ${recordId}`;
  },
};
