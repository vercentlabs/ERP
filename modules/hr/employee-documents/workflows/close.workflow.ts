export const employeeDocumentsCloseWorkflow = {
  module: "hr/employee-documents",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/employee-documents record ${recordId}`;
  },
};
