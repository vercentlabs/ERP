export const approvalsAuditCancelWorkflow = {
  module: "compliance/approvals-audit",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for compliance/approvals-audit record ${recordId}`;
  },
};
