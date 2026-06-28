export const exportsCancelWorkflow = {
  module: "platform/exports",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/exports record ${recordId}`;
  },
};
