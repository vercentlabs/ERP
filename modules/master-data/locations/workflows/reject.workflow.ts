export const locationsRejectWorkflow = {
  module: "master-data/locations",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/locations record ${recordId}`;
  },
};
