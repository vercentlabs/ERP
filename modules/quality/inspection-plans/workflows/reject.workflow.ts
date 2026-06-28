export const inspectionPlansRejectWorkflow = {
  module: "quality/inspection-plans",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for quality/inspection-plans record ${recordId}`;
  },
};
