export const deductionsCancelWorkflow = {
  module: "payroll/deductions",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for payroll/deductions record ${recordId}`;
  },
};
