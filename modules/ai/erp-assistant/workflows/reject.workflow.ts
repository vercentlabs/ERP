export const erpAssistantRejectWorkflow = {
  module: "ai/erp-assistant",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for ai/erp-assistant record ${recordId}`;
  },
};
