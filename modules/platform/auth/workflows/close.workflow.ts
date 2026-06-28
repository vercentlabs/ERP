export const authCloseWorkflow = {
  module: "platform/auth",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/auth record ${recordId}`;
  },
};
