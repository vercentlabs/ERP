export const complianceDisclosuresSubmitWorkflow = {
  module: "sustainability/compliance-disclosures",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sustainability/compliance-disclosures record ${recordId}`;
  },
};
