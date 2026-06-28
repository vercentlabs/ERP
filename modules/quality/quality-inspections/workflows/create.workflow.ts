export const qualityInspectionsCreateWorkflow = {
  module: "quality/quality-inspections",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for quality/quality-inspections record ${recordId}`;
  },
};
