export const erpAssistantCloseWorkflow = {
  module: "ai/erp-assistant",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for ai/erp-assistant record ${recordId}`;
  },
};
