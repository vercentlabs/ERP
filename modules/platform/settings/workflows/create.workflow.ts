export const settingsCreateWorkflow = {
  module: "platform/settings",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/settings record ${recordId}`;
  },
};
