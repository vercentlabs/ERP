export const qualityCertificatesCancelWorkflow = {
  module: "quality/quality-certificates",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for quality/quality-certificates record ${recordId}`;
  },
};
