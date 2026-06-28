export const inspectionPlansCancelWorkflow = {
  module: "quality/inspection-plans",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for quality/inspection-plans record ${recordId}`;
  },
};
