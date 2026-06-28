export const integrationsApproveWorkflow = {
  module: "platform/integrations",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/integrations record ${recordId}`;
  },
};
