export const qualityCertificatesCloseWorkflow = {
  module: "quality/quality-certificates",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for quality/quality-certificates record ${recordId}`;
  },
};
