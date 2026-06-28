export const erpAssistantApproveWorkflow = {
  module: "ai/erp-assistant",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for ai/erp-assistant record ${recordId}`;
  },
};
