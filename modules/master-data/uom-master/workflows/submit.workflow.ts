export const uomMasterSubmitWorkflow = {
  module: "master-data/uom-master",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/uom-master record ${recordId}`;
  },
};
