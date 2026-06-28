export const inspectionPlansApproveWorkflow = {
  module: "quality/inspection-plans",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for quality/inspection-plans record ${recordId}`;
  },
};
