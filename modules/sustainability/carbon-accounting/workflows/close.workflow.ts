export const carbonAccountingCloseWorkflow = {
  module: "sustainability/carbon-accounting",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sustainability/carbon-accounting record ${recordId}`;
  },
};
