export const currencyMasterCloseWorkflow = {
  module: "master-data/currency-master",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/currency-master record ${recordId}`;
  },
};
