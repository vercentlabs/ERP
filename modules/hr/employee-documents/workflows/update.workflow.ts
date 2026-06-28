export const employeeDocumentsUpdateWorkflow = {
  module: "hr/employee-documents",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/employee-documents record ${recordId}`;
  },
};
