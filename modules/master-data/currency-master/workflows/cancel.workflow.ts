export const currencyMasterCancelWorkflow = {
  module: "master-data/currency-master",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/currency-master record ${recordId}`;
  },
};
