export const employeeDocumentsCancelWorkflow = {
  module: "hr/employee-documents",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/employee-documents record ${recordId}`;
  },
};
