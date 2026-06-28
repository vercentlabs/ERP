export const approvalsAuditCloseWorkflow = {
  module: "compliance/approvals-audit",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for compliance/approvals-audit record ${recordId}`;
  },
};
