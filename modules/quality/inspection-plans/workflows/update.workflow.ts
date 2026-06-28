export const inspectionPlansUpdateWorkflow = {
  module: "quality/inspection-plans",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for quality/inspection-plans record ${recordId}`;
  },
};
