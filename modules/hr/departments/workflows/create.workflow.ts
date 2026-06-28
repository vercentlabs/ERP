export const departmentsCreateWorkflow = {
  module: "hr/departments",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for hr/departments record ${recordId}`;
  },
};
