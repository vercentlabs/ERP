export const employeesSubmitWorkflow = {
  module: "master-data/employees",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/employees record ${recordId}`;
  },
};
