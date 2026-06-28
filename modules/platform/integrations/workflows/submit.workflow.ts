export const integrationsSubmitWorkflow = {
  module: "platform/integrations",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/integrations record ${recordId}`;
  },
};
