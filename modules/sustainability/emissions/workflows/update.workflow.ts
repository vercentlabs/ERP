export const emissionsUpdateWorkflow = {
  module: "sustainability/emissions",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sustainability/emissions record ${recordId}`;
  },
};
