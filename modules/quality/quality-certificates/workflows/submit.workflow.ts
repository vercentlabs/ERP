export const qualityCertificatesSubmitWorkflow = {
  module: "quality/quality-certificates",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for quality/quality-certificates record ${recordId}`;
  },
};
