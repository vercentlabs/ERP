export const employeesRejectWorkflow = {
  module: "hr/employees",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for hr/employees record ${recordId}`;
  },
};
