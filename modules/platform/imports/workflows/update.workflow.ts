export const importsUpdateWorkflow = {
  module: "platform/imports",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/imports record ${recordId}`;
  },
};
