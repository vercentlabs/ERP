export const complianceDisclosuresApproveWorkflow = {
  module: "sustainability/compliance-disclosures",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sustainability/compliance-disclosures record ${recordId}`;
  },
};
