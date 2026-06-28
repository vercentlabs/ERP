export const erpAssistantUpdateWorkflow = {
  module: "ai/erp-assistant",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for ai/erp-assistant record ${recordId}`;
  },
};
