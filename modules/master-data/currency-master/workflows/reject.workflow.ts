export const currencyMasterRejectWorkflow = {
  module: "master-data/currency-master",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/currency-master record ${recordId}`;
  },
};
