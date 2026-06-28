export const complianceDisclosuresUpdateWorkflow = {
  module: "sustainability/compliance-disclosures",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sustainability/compliance-disclosures record ${recordId}`;
  },
};
