export const qualityCertificatesRejectWorkflow = {
  module: "quality/quality-certificates",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for quality/quality-certificates record ${recordId}`;
  },
};
