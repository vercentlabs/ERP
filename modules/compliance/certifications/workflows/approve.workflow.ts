export const certificationsApproveWorkflow = {
  module: "compliance/certifications",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for compliance/certifications record ${recordId}`;
  },
};
