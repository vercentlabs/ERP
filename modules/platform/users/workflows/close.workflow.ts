export const usersCloseWorkflow = {
  module: "platform/users",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/users record ${recordId}`;
  },
};
