export const exportsCreateWorkflow = {
  module: "platform/exports",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/exports record ${recordId}`;
  },
};
