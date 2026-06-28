export const employeesSubmitWorkflow = {
  module: "hr/employees",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/employees record ${recordId}`;
  },
};
