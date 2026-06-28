export const erpAssistantCancelWorkflow = {
  module: "ai/erp-assistant",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for ai/erp-assistant record ${recordId}`;
  },
};
