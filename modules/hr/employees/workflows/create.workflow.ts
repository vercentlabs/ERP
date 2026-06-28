export const employeesCreateWorkflow = {
  module: "hr/employees",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/employees record ${recordId}`;
  },
};
