export const integrationsRejectWorkflow = {
  module: "platform/integrations",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/integrations record ${recordId}`;
  },
};
