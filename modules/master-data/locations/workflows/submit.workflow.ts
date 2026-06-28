export const locationsSubmitWorkflow = {
  module: "master-data/locations",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/locations record ${recordId}`;
  },
};
