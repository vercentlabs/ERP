export const employeesCreateWorkflow = {
  module: "master-data/employees",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/employees record ${recordId}`;
  },
};
