export const documentsSubmitWorkflow = {
  module: "platform/documents",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/documents record ${recordId}`;
  },
};
