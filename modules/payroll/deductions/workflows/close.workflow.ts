export const deductionsCloseWorkflow = {
  module: "payroll/deductions",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for payroll/deductions record ${recordId}`;
  },
};
