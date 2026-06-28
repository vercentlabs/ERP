export const carbonAccountingSubmitWorkflow = {
  module: "sustainability/carbon-accounting",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sustainability/carbon-accounting record ${recordId}`;
  },
};
