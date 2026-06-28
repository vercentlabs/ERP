export const timesheetsApproveWorkflow = {
  module: "projects/timesheets",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for projects/timesheets record ${recordId}`;
  },
};
