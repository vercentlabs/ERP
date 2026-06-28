export const locationsCloseWorkflow = {
  module: "master-data/locations",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/locations record ${recordId}`;
  },
};
