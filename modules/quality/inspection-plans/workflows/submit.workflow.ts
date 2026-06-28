export const inspectionPlansSubmitWorkflow = {
  module: "quality/inspection-plans",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for quality/inspection-plans record ${recordId}`;
  },
};
