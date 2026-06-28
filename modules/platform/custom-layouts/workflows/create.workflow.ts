export const customLayoutsCreateWorkflow = {
  module: "platform/custom-layouts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/custom-layouts record ${recordId}`;
  },
};
