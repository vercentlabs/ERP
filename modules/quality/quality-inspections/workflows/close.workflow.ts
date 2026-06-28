export const qualityInspectionsCloseWorkflow = {
  module: "quality/quality-inspections",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for quality/quality-inspections record ${recordId}`;
  },
};
