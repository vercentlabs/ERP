export const authSubmitWorkflow = {
  module: "platform/auth",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/auth record ${recordId}`;
  },
};
