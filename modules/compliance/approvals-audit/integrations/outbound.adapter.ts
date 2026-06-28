export const approvalsAuditOutboundAdapter = {
  name: "compliance/approvals-audit.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/approvals-audit",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
