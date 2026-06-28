export const departmentsSubmitWorkflow = {
  module: "hr/departments",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for hr/departments record ${recordId}`;
  },
};
