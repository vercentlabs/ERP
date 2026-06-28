export const performanceCancelWorkflow = {
  module: "hr/performance",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/performance record ${recordId}`;
  },
};
