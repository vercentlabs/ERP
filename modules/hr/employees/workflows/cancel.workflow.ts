export const employeesCancelWorkflow = {
  module: "hr/employees",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/employees record ${recordId}`;
  },
};
