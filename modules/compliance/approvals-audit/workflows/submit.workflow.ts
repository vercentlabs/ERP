export const approvalsAuditSubmitWorkflow = {
  module: "compliance/approvals-audit",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for compliance/approvals-audit record ${recordId}`;
  },
};
