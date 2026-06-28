export const correctiveActionsApproveWorkflow = {
  module: "quality/corrective-actions",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for quality/corrective-actions record ${recordId}`;
  },
};
