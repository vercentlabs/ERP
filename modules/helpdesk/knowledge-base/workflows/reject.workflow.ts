export const knowledgeBaseRejectWorkflow = {
  module: "helpdesk/knowledge-base",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for helpdesk/knowledge-base record ${recordId}`;
  },
};
