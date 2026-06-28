export const importsCancelWorkflow = {
  module: "platform/imports",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/imports record ${recordId}`;
  },
};
