export const nonConformanceApproveWorkflow = {
  module: "quality/non-conformance",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for quality/non-conformance record ${recordId}`;
  },
};
