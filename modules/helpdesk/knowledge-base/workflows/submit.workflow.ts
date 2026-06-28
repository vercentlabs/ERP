export const knowledgeBaseSubmitWorkflow = {
  module: "helpdesk/knowledge-base",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for helpdesk/knowledge-base record ${recordId}`;
  },
};
