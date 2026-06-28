export const certificationsRejectWorkflow = {
  module: "compliance/certifications",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for compliance/certifications record ${recordId}`;
  },
};
