export const carbonAccountingCreateWorkflow = {
  module: "sustainability/carbon-accounting",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sustainability/carbon-accounting record ${recordId}`;
  },
};
