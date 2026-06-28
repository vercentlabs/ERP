export const nonConformanceRejectWorkflow = {
  module: "quality/non-conformance",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for quality/non-conformance record ${recordId}`;
  },
};
