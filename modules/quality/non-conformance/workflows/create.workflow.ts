export const nonConformanceCreateWorkflow = {
  module: "quality/non-conformance",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for quality/non-conformance record ${recordId}`;
  },
};
