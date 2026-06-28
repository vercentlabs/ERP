export const employeesCloseWorkflow = {
  module: "master-data/employees",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/employees record ${recordId}`;
  },
};
