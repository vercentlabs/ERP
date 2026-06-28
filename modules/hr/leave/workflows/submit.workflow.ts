export const leaveSubmitWorkflow = {
  module: "hr/leave",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/leave record ${recordId}`;
  },
};
