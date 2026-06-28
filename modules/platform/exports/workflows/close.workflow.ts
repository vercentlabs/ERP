export const exportsCloseWorkflow = {
  module: "platform/exports",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/exports record ${recordId}`;
  },
};
