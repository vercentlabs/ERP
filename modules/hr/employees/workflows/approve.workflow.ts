export const employeesApproveWorkflow = {
  module: "hr/employees",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/employees record ${recordId}`;
  },
};
