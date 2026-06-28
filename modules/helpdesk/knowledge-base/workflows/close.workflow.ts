export const knowledgeBaseCloseWorkflow = {
  module: "helpdesk/knowledge-base",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for helpdesk/knowledge-base record ${recordId}`;
  },
};
