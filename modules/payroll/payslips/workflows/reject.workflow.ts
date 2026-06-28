export const payslipsRejectWorkflow = {
  module: "payroll/payslips",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for payroll/payslips record ${recordId}`;
  },
};
