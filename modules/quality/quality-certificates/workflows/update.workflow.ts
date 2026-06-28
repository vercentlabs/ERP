export const qualityCertificatesUpdateWorkflow = {
  module: "quality/quality-certificates",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for quality/quality-certificates record ${recordId}`;
  },
};
