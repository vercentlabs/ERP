export const taxMasterSubmitWorkflow = {
  module: "master-data/tax-master",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/tax-master record ${recordId}`;
  },
};
