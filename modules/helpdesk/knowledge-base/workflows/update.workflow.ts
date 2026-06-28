export const knowledgeBaseUpdateWorkflow = {
  module: "helpdesk/knowledge-base",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for helpdesk/knowledge-base record ${recordId}`;
  },
};
