export const timesheetsSubmitWorkflow = {
  module: "projects/timesheets",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for projects/timesheets record ${recordId}`;
  },
};
