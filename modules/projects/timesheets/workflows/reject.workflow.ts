export const timesheetsRejectWorkflow = {
  module: "projects/timesheets",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for projects/timesheets record ${recordId}`;
  },
};
