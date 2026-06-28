export const qualityInspectionsSubmitWorkflow = {
  module: "quality/quality-inspections",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for quality/quality-inspections record ${recordId}`;
  },
};
