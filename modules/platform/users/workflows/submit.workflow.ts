export const usersSubmitWorkflow = {
  module: "platform/users",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/users record ${recordId}`;
  },
};
