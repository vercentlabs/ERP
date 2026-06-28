export const attendanceSubmitWorkflow = {
  module: "hr/attendance",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/attendance record ${recordId}`;
  },
};
