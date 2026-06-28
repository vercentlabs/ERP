export const integrationsCancelWorkflow = {
  module: "platform/integrations",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/integrations record ${recordId}`;
  },
};
