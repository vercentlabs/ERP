export const complianceDisclosuresCloseWorkflow = {
  module: "sustainability/compliance-disclosures",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sustainability/compliance-disclosures record ${recordId}`;
  },
};
