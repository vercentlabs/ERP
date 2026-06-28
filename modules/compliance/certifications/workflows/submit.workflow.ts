export const certificationsSubmitWorkflow = {
  module: "compliance/certifications",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for compliance/certifications record ${recordId}`;
  },
};
