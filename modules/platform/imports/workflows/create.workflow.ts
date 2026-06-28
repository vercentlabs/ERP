export const importsCreateWorkflow = {
  module: "platform/imports",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/imports record ${recordId}`;
  },
};
