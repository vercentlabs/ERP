export const currencyMasterCreateWorkflow = {
  module: "master-data/currency-master",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/currency-master record ${recordId}`;
  },
};
