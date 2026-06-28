export const correctiveActionsCancelWorkflow = {
  module: "quality/corrective-actions",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for quality/corrective-actions record ${recordId}`;
  },
};
