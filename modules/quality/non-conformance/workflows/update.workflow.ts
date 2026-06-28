export const nonConformanceUpdateWorkflow = {
  module: "quality/non-conformance",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for quality/non-conformance record ${recordId}`;
  },
};
