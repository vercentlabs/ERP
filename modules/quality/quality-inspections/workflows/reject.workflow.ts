export const qualityInspectionsRejectWorkflow = {
  module: "quality/quality-inspections",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for quality/quality-inspections record ${recordId}`;
  },
};
