export const customFieldsCancelWorkflow = {
  module: "platform/custom-fields",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/custom-fields record ${recordId}`;
  },
};
