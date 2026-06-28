export const complianceDisclosuresCancelWorkflow = {
  module: "sustainability/compliance-disclosures",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sustainability/compliance-disclosures record ${recordId}`;
  },
};
