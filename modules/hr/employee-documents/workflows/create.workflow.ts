export const employeeDocumentsCreateWorkflow = {
  module: "hr/employee-documents",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/employee-documents record ${recordId}`;
  },
};
