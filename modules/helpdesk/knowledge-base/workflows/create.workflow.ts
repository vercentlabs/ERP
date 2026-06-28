export const knowledgeBaseCreateWorkflow = {
  module: "helpdesk/knowledge-base",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for helpdesk/knowledge-base record ${recordId}`;
  },
};
