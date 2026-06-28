export const importsCloseWorkflow = {
  module: "platform/imports",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/imports record ${recordId}`;
  },
};
