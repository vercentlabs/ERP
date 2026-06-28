export const documentsRejectWorkflow = {
  module: "platform/documents",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/documents record ${recordId}`;
  },
};
