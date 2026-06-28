export const employeesUpdateWorkflow = {
  module: "hr/employees",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/employees record ${recordId}`;
  },
};
