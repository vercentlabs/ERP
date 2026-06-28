export const shiftsSubmitWorkflow = {
  module: "hr/shifts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/shifts record ${recordId}`;
  },
};
