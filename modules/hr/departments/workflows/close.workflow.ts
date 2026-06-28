export const departmentsCloseWorkflow = {
  module: "hr/departments",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/departments record ${recordId}`;
  },
};
