export const correctiveActionsCreateWorkflow = {
  module: "quality/corrective-actions",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for quality/corrective-actions record ${recordId}`;
  },
};
