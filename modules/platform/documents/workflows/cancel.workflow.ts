export const documentsCancelWorkflow = {
  module: "platform/documents",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/documents record ${recordId}`;
  },
};
