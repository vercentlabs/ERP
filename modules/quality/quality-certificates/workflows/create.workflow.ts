export const qualityCertificatesCreateWorkflow = {
  module: "quality/quality-certificates",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for quality/quality-certificates record ${recordId}`;
  },
};
