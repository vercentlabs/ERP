export const controlsCreateWorkflow = {
  module: "compliance/controls",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for compliance/controls record ${recordId}`;
  },
};
