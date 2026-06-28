export const certificationsCloseWorkflow = {
  module: "compliance/certifications",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for compliance/certifications record ${recordId}`;
  },
};
