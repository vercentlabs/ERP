export const qualityInspectionsCancelWorkflow = {
  module: "quality/quality-inspections",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for quality/quality-inspections record ${recordId}`;
  },
};
