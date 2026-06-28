export const shiftsRejectWorkflow = {
  module: "hr/shifts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for hr/shifts record ${recordId}`;
  },
};
