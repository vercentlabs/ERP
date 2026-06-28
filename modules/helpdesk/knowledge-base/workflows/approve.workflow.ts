export const knowledgeBaseApproveWorkflow = {
  module: "helpdesk/knowledge-base",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for helpdesk/knowledge-base record ${recordId}`;
  },
};
