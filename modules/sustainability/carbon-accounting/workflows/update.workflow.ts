export const carbonAccountingUpdateWorkflow = {
  module: "sustainability/carbon-accounting",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sustainability/carbon-accounting record ${recordId}`;
  },
};
