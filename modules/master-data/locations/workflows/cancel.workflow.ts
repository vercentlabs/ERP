export const locationsCancelWorkflow = {
  module: "master-data/locations",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/locations record ${recordId}`;
  },
};
