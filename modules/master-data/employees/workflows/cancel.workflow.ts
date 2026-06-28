export const employeesCancelWorkflow = {
  module: "master-data/employees",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/employees record ${recordId}`;
  },
};
