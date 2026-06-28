export const employeesCloseWorkflow = {
  module: "hr/employees",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/employees record ${recordId}`;
  },
};
