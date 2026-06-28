export const departmentsApproveWorkflow = {
  module: "hr/departments",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/departments record ${recordId}`;
  },
};
