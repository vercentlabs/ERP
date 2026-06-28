export const qualityInspectionsUpdateWorkflow = {
  module: "quality/quality-inspections",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for quality/quality-inspections record ${recordId}`;
  },
};
