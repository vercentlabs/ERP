export const nonConformanceCloseWorkflow = {
  module: "quality/non-conformance",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for quality/non-conformance record ${recordId}`;
  },
};
