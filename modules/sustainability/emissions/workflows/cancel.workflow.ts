export const emissionsCancelWorkflow = {
  module: "sustainability/emissions",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sustainability/emissions record ${recordId}`;
  },
};
