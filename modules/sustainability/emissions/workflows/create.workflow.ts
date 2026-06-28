export const emissionsCreateWorkflow = {
  module: "sustainability/emissions",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sustainability/emissions record ${recordId}`;
  },
};
