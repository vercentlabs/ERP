export const qualityCertificatesApproveWorkflow = {
  module: "quality/quality-certificates",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for quality/quality-certificates record ${recordId}`;
  },
};
