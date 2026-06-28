export const knowledgeBaseCancelWorkflow = {
  module: "helpdesk/knowledge-base",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for helpdesk/knowledge-base record ${recordId}`;
  },
};
