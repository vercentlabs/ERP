export const shiftsApproveWorkflow = {
  module: "hr/shifts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/shifts record ${recordId}`;
  },
};
