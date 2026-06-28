export const integrationsCreateWorkflow = {
  module: "platform/integrations",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/integrations record ${recordId}`;
  },
};
