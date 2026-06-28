export const attendanceCancelWorkflow = {
  module: "hr/attendance",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/attendance record ${recordId}`;
  },
};
