export const attendanceApproveWorkflow = {
  module: "hr/attendance",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/attendance record ${recordId}`;
  },
};
