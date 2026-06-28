export const qualityInspectionsApproveWorkflow = {
  module: "quality/quality-inspections",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for quality/quality-inspections record ${recordId}`;
  },
};
