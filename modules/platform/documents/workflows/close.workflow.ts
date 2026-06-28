export const documentsCloseWorkflow = {
  module: "platform/documents",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/documents record ${recordId}`;
  },
};
