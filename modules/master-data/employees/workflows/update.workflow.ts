export const employeesUpdateWorkflow = {
  module: "master-data/employees",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/employees record ${recordId}`;
  },
};
