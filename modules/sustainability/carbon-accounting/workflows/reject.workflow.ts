export const carbonAccountingRejectWorkflow = {
  module: "sustainability/carbon-accounting",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sustainability/carbon-accounting record ${recordId}`;
  },
};
