export const partiesSubmitWorkflow = {
  module: "master-data/parties",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/parties record ${recordId}`;
  },
};
