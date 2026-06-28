export const partiesCancelWorkflow = {
  module: "master-data/parties",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/parties record ${recordId}`;
  },
};
