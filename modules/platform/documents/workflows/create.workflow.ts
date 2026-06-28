export const documentsCreateWorkflow = {
  module: "platform/documents",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/documents record ${recordId}`;
  },
};
