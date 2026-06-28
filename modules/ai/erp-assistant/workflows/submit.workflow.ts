export const erpAssistantSubmitWorkflow = {
  module: "ai/erp-assistant",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for ai/erp-assistant record ${recordId}`;
  },
};
