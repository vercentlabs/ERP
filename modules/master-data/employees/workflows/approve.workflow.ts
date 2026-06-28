export const employeesApproveWorkflow = {
  module: "master-data/employees",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/employees record ${recordId}`;
  },
};
