export const erpAssistantCreateWorkflow = {
  module: "ai/erp-assistant",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for ai/erp-assistant record ${recordId}`;
  },
};
