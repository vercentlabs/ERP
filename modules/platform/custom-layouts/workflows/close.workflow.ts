export const customLayoutsCloseWorkflow = {
  module: "platform/custom-layouts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/custom-layouts record ${recordId}`;
  },
};
