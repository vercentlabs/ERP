export const learningCancelWorkflow = {
  module: "hr/learning",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/learning record ${recordId}`;
  },
};
