export const certificationsCreateWorkflow = {
  module: "compliance/certifications",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for compliance/certifications record ${recordId}`;
  },
};
