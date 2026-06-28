export const employeeDocumentsRejectWorkflow = {
  module: "hr/employee-documents",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for hr/employee-documents record ${recordId}`;
  },
};
