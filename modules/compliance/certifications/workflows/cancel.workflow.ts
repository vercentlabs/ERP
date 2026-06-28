export const certificationsCancelWorkflow = {
  module: "compliance/certifications",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for compliance/certifications record ${recordId}`;
  },
};
