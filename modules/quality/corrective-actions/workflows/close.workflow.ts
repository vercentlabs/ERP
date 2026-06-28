export const correctiveActionsCloseWorkflow = {
  module: "quality/corrective-actions",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for quality/corrective-actions record ${recordId}`;
  },
};
