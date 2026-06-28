export const complianceDisclosuresCreateWorkflow = {
  module: "sustainability/compliance-disclosures",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sustainability/compliance-disclosures record ${recordId}`;
  },
};
