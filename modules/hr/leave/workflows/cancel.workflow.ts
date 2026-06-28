export const leaveCancelWorkflow = {
  module: "hr/leave",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/leave record ${recordId}`;
  },
};
