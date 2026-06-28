export const correctiveActionsUpdateWorkflow = {
  module: "quality/corrective-actions",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for quality/corrective-actions record ${recordId}`;
  },
};
