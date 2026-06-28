export const deductionsSubmitWorkflow = {
  module: "payroll/deductions",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for payroll/deductions record ${recordId}`;
  },
};
