export const emissionsCloseWorkflow = {
  module: "sustainability/emissions",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sustainability/emissions record ${recordId}`;
  },
};
