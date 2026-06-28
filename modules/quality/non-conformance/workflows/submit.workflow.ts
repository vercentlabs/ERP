export const nonConformanceSubmitWorkflow = {
  module: "quality/non-conformance",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for quality/non-conformance record ${recordId}`;
  },
};
