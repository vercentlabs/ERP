export const integrationsUpdateWorkflow = {
  module: "platform/integrations",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/integrations record ${recordId}`;
  },
};
