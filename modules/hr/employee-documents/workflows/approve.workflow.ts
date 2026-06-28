export const employeeDocumentsApproveWorkflow = {
  module: "hr/employee-documents",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/employee-documents record ${recordId}`;
  },
};
