export const correctiveActionsSubmitWorkflow = {
  module: "quality/corrective-actions",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for quality/corrective-actions record ${recordId}`;
  },
};
