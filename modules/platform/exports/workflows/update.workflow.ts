export const exportsUpdateWorkflow = {
  module: "platform/exports",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/exports record ${recordId}`;
  },
};
