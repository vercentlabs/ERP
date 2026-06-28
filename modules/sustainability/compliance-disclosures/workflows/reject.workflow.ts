export const complianceDisclosuresRejectWorkflow = {
  module: "sustainability/compliance-disclosures",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sustainability/compliance-disclosures record ${recordId}`;
  },
};
