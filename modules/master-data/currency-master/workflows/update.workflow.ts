export const currencyMasterUpdateWorkflow = {
  module: "master-data/currency-master",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/currency-master record ${recordId}`;
  },
};
