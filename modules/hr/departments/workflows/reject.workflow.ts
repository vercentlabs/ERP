export const departmentsRejectWorkflow = {
  module: "hr/departments",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for hr/departments record ${recordId}`;
  },
};
