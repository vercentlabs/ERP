export const approvalsAuditInboundAdapter = {
  name: "compliance/approvals-audit.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/approvals-audit",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
