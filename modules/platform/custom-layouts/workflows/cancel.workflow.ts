export const customLayoutsCancelWorkflow = {
  module: "platform/custom-layouts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/custom-layouts record ${recordId}`;
  },
};
