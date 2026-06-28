export const departmentsCancelWorkflow = {
  module: "hr/departments",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for hr/departments record ${recordId}`;
  },
};
