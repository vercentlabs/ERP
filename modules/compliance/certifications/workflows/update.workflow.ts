export const certificationsUpdateWorkflow = {
  module: "compliance/certifications",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for compliance/certifications record ${recordId}`;
  },
};
