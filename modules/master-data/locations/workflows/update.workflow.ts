export const locationsUpdateWorkflow = {
  module: "master-data/locations",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/locations record ${recordId}`;
  },
};
