export const inspectionPlansCloseWorkflow = {
  module: "quality/inspection-plans",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for quality/inspection-plans record ${recordId}`;
  },
};
