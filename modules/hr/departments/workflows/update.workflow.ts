export const departmentsUpdateWorkflow = {
  module: "hr/departments",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/departments record ${recordId}`;
  },
};
