export const documentsUpdateWorkflow = {
  module: "platform/documents",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/documents record ${recordId}`;
  },
};
