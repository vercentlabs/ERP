export const carbonAccountingCancelWorkflow = {
  module: "sustainability/carbon-accounting",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sustainability/carbon-accounting record ${recordId}`;
  },
};
