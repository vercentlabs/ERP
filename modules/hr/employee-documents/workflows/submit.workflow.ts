export const employeeDocumentsSubmitWorkflow = {
  module: "hr/employee-documents",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/employee-documents record ${recordId}`;
  },
};
