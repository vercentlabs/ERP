export const inspectionPlansCreateWorkflow = {
  module: "quality/inspection-plans",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for quality/inspection-plans record ${recordId}`;
  },
};
