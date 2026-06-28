export const nonConformanceCancelWorkflow = {
  module: "quality/non-conformance",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for quality/non-conformance record ${recordId}`;
  },
};
