export const correctiveActionsRejectWorkflow = {
  module: "quality/corrective-actions",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for quality/corrective-actions record ${recordId}`;
  },
};
