export const deductionsRejectWorkflow = {
  module: "payroll/deductions",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for payroll/deductions record ${recordId}`;
  },
};
