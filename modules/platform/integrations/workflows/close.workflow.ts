export const integrationsCloseWorkflow = {
  module: "platform/integrations",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/integrations record ${recordId}`;
  },
};
