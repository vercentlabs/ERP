export const currencyMasterSubmitWorkflow = {
  module: "master-data/currency-master",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/currency-master record ${recordId}`;
  },
};
