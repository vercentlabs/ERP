export const usersCancelWorkflow = {
  module: "platform/users",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/users record ${recordId}`;
  },
};
